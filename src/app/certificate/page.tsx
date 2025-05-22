"use client";

import "core-js/actual/promise/with-resolvers";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// For local development, change to ''
const DEPLOYMENT_PREFIX = "/CA_Birth_Certificates";

pdfjs.GlobalWorkerOptions.workerSrc = `${DEPLOYMENT_PREFIX}/pdf.worker.mjs`;

import MobileDetect from "mobile-detect";
import moment from "moment";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { SignatureModal } from "@/components/SignatureModal";
import Script from "next/script";
import { InfoModal } from "@/components/InfoModal";

// Should just be /birth_certificate_sample.pdf for local development
const PDF_URL = `${DEPLOYMENT_PREFIX}/birth_certificate_sample.pdf`;

const dataURLToUint8Array = (dataURL: string) => {
  const base64 = dataURL.split(",")[1];
  const binaryString = atob(base64);
  const array = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    array[i] = binaryString.charCodeAt(i);
  }
  return array;
};

const getCurrentDateString = () => {
  return moment().format("MM/DD/YYYY HH:mm");
};

type SignatureType = "parent1" | "parent2" | "attendant";

export default function Certificate() {
  // These state variables track the object URL of the PDF to display and export, respectively, as we add signatures
  // We need separate URLs because we want to display, but not export, the yellow highlighting on the signature fields.
  const [pdfDisplayURL, setPdfDisplayURL] = useState<string | null>(null);
  const [pdfExportURL, setPdfExportURL] = useState(PDF_URL);

  // Parent 1, then parent 2, then attendant
  const [signatureDataURLs, setSignatureDataUrls] = useState<
    [string | null, string | null, string | null]
  >([null, null, null] as const);
  const [signatureDates, setSignatureDates] = useState(["", "", ""]);

  const [pageWidth, setPageWidth] = useState(400);
  const [currentSignature, setCurrentSignature] =
    useState<SignatureType>("parent1");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const onPageResize = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    onPageResize();
    window.addEventListener("resize", onPageResize);
    return () => window.removeEventListener("resize", onPageResize);
  }, []);

  const showSignaturePopup = () => {
    setIsPopupOpen(true);
  };

  const drawSignatureOnPage = async (
    pdfDoc: PDFDocument,
    dataURL: string | null,
    position: { x: number; y: number },
    small?: boolean
  ) => {
    if (!dataURL) {
      return;
    }

    const pages = pdfDoc.getPages();
    const secondPage = pages[1];

    const signatureImageArray = dataURLToUint8Array(dataURL);
    const signatureImage = await pdfDoc.embedPng(signatureImageArray);

    secondPage.drawImage(signatureImage, {
      x: position.x,
      y: position.y,
      width: small ? 90 : 150,
      height: small ? 15 : 25
    });
  };

  const writeDateOnPage = async (
    pdfDoc: PDFDocument,
    dateString: string,
    position: { x: number; y: number }
  ) => {
    const pages = pdfDoc.getPages();
    const secondPage = pages[1];

    secondPage.drawText(dateString, {
      x: position.x,
      y: position.y,
      size: 12
    });
  };

  const drawSignaturesOnPage = async (
    pdfDoc: PDFDocument,
    secondPageOnly: boolean
  ) => {
    drawSignatureOnPage(pdfDoc, signatureDataURLs[0], {
      x: 100,
      y: 205
    });
    writeDateOnPage(pdfDoc, signatureDates[0], {
      x: 150,
      y: 185
    });

    drawSignatureOnPage(pdfDoc, signatureDataURLs[1], {
      x: 375,
      y: 205
    });
    writeDateOnPage(pdfDoc, signatureDates[1], {
      x: 425,
      y: 185
    });

    drawSignatureOnPage(
      pdfDoc,
      signatureDataURLs[2],
      {
        x: 225,
        y: 60
      },
      true
    );
    writeDateOnPage(pdfDoc, signatureDates[2], {
      x: 465,
      y: 67
    });

    if (secondPageOnly) {
      pdfDoc.removePage(2);
      pdfDoc.removePage(0);
    }

    const modifiedPDFBytes = await pdfDoc.save();

    const blob = new Blob([modifiedPDFBytes], {
      type: "application/pdf"
    });
    return URL.createObjectURL(blob);
  };

  const drawHighlightBoxesOnPage = (pdfDoc: PDFDocument) => {
    const pages = pdfDoc.getPages();
    const secondPage = pages[1];

    secondPage.drawRectangle({
      x: 45,
      y: 205,
      width: 260,
      height: 25,
      color: rgb(1, 1, 0)
    });

    secondPage.drawRectangle({
      x: 320,
      y: 205,
      width: 260,
      height: 25,
      color: rgb(1, 1, 0)
    });

    secondPage.drawRectangle({
      x: 180,
      y: 62,
      width: 200,
      height: 15,
      color: rgb(1, 1, 0)
    });
  };

  useEffect(() => {
    const onSignatureURLsUpdated = async () => {
      const response = await fetch(PDF_URL);
      const pdfBuffer = await response.arrayBuffer();

      const pdfDisplayDoc = await PDFDocument.load(pdfBuffer);
      const pdfExportDoc = await PDFDocument.load(pdfBuffer);

      drawHighlightBoxesOnPage(pdfDisplayDoc);

      setPdfDisplayURL(await drawSignaturesOnPage(pdfDisplayDoc, false));
      setPdfExportURL(await drawSignaturesOnPage(pdfExportDoc, true));
    };

    onSignatureURLsUpdated();
  }, [signatureDataURLs]);

  const onSave = async (signatureDataUrl: string) => {
    const newSignatureDataURLs = [...signatureDataURLs] as [
      string | null,
      string | null,
      string | null
    ];
    const newSignatureDates = [...signatureDates];
    const currentDateString = getCurrentDateString();
    switch (currentSignature) {
      case "parent1":
        newSignatureDataURLs[0] = signatureDataUrl;
        newSignatureDates[0] = currentDateString;
        break;
      case "parent2":
        newSignatureDataURLs[1] = signatureDataUrl;
        newSignatureDates[1] = currentDateString;
        break;
      case "attendant":
      default:
        newSignatureDataURLs[2] = signatureDataUrl;
        newSignatureDates[2] = currentDateString;
    }

    setSignatureDataUrls(newSignatureDataURLs);
    setSignatureDates(newSignatureDates);
    setIsPopupOpen(false);
  };

  const downloadModifiedPDF = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfExportURL;
    downloadLink.download = "birth_certificate_sample_signed.pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (typeof window !== "undefined") {
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const PleaseRotateOptions = {
      onHide: () => {
        setTimeout(() => {
          setInfoModalOpen(true);
        }, 1500);
      },
      startOnPageLoad: !mobileDetect.tablet()
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).PleaseRotateOptions = PleaseRotateOptions;
  }

  return (
    <>
      {
        // eslint-disable-next-line @next/next/no-sync-scripts
        <Script src="pleaserotate.min.js" />
      }
      <div>
        <Document file={pdfDisplayURL}>
          <div style={{ border: "2px solid black" }}>
            <Page pageNumber={1} width={pageWidth - 48} />
          </div>
          <div style={{ border: "2px solid black", marginTop: 48 }}>
            <Page
              pageNumber={2}
              canvasRef={pdfCanvasRef}
              width={pageWidth - 48}
              onClick={(e) => {
                if (!pdfCanvasRef.current) {
                  console.error("pdfCanvasRef is unexpectedly null");
                  return;
                }
                const pdfRect = pdfCanvasRef.current.getBoundingClientRect();
                const x = ((e.clientX - pdfRect.x) * 922) / pdfRect.width;
                const y = ((e.clientY - pdfRect.y) * 1192) / pdfRect.height;

                if (x >= 70 && x <= 455 && y >= 845 && y <= 880) {
                  setCurrentSignature("parent1");
                  showSignaturePopup();
                } else if (x >= 480 && x <= 870 && y >= 845 && y <= 880) {
                  setCurrentSignature("parent2");
                  showSignaturePopup();
                } else if (x >= 270 && x <= 570 && y >= 1075 && y <= 1100) {
                  setCurrentSignature("attendant");
                  showSignaturePopup();
                }
              }}
              onLoadSuccess={() => {
                if (signatureDataURLs.filter(Boolean).length > 0) {
                  window.scrollTo(0, document.body.scrollHeight - 450);
                }
              }}
            />
          </div>
          <div style={{ border: "2px solid black" }}>
            <Page pageNumber={3} width={pageWidth - 48} />
          </div>
        </Document>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12
        }}
      >
        <Button
          style={{
            backgroundColor: "blue",
            color: "white",
            textTransform: "none",
            borderRadius: 4,
            fontSize: 24
          }}
          onClick={downloadModifiedPDF}
        >
          Upload
        </Button>
      </div>

      <SignatureModal
        isOpen={isPopupOpen}
        title={
          currentSignature === "parent1"
            ? "Parent/Informant 1 Signature"
            : currentSignature === "parent2"
              ? "Parent/Informant 2 Signature"
              : "Attendant/Certifier - Signature"
        }
        onClose={() => setIsPopupOpen(false)}
        onSave={onSave}
      />

      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </>
  );
}
