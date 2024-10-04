"use client";

import "core-js/actual/promise/with-resolvers";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PleaseRotate from "pleaserotate.js";

// For local development, change to ''
const DEPLOYMENT_PREFIX = "/CA_Birth_Certificates";

pdfjs.GlobalWorkerOptions.workerSrc = `${DEPLOYMENT_PREFIX}/pdf.worker.mjs`;

import { PDFDocument, rgb } from "pdf-lib";
import { Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { SignatureModal } from "@/components/SignatureModal";

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

export default function Certificate() {
  // These state variables track the object URL of the PDF to display and export, respectively, as we add signatures
  // We need separate URLs because we want to display, but not export, the yellow highlighting on the signature fields.
  const [pdfDisplayURL, setPdfDisplayURL] = useState<string | null>(null);
  const [pdfExportURL, setPdfExportURL] = useState(PDF_URL);

  // 12A parent 1, then 12A parent 2, then 13A
  const [signatureDataURLs, setSignatureDataUrls] = useState<
    [string | null, string | null, string | null]
  >([null, null, null] as const);

  const [pageWidth, setPageWidth] = useState(400);
  const [isShowingField12, setIsShowingField12] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    position: { x: number; pageHeightMinusY: number }
  ) => {
    if (!dataURL) {
      return;
    }

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const pageHeight = firstPage.getHeight();

    const signatureImageArray = dataURLToUint8Array(dataURL);
    const signatureImage = await pdfDoc.embedPng(signatureImageArray);

    firstPage.drawImage(signatureImage, {
      x: position.x,
      y: pageHeight - position.pageHeightMinusY,
      width: 75,
      height: 15
    });
  };

  const drawSignaturesOnPage = async (pdfDoc: PDFDocument) => {
    drawSignatureOnPage(pdfDoc, signatureDataURLs[0], {
      x: 175,
      pageHeightMinusY: 207 + 15
    });

    drawSignatureOnPage(pdfDoc, signatureDataURLs[1], {
      x: 275,
      pageHeightMinusY: 207 + 15
    });

    drawSignatureOnPage(pdfDoc, signatureDataURLs[2], {
      x: 175,
      pageHeightMinusY: 233 + 15
    });

    const modifiedPDFBytes = await pdfDoc.save();

    const blob = new Blob([modifiedPDFBytes], {
      type: "application/pdf"
    });
    return URL.createObjectURL(blob);
  };

  const drawHighlightBoxesOnPage = (pdfDoc: PDFDocument) => {
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const pageHeight = firstPage.getHeight();

    firstPage.drawRectangle({
      x: 167,
      y: pageHeight - (209 + 15),
      width: 247,
      height: 16,
      color: rgb(1, 1, 0)
    });

    firstPage.drawRectangle({
      x: 167,
      y: pageHeight - (233 + 15),
      width: 247,
      height: 16,
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

      setPdfDisplayURL(await drawSignaturesOnPage(pdfDisplayDoc));
      setPdfExportURL(await drawSignaturesOnPage(pdfExportDoc));
    };

    onSignatureURLsUpdated();
  }, [signatureDataURLs]);

  const onSave = async (
    signatureDataUrl1: string,
    signatureDataUrl2?: string
  ) => {
    const newSignatureDataURLs = [...signatureDataURLs] as [
      string | null,
      string | null,
      string | null
    ];
    if (isShowingField12) {
      newSignatureDataURLs[0] = signatureDataUrl1;
      newSignatureDataURLs[1] = signatureDataUrl2 ?? null;
    } else {
      newSignatureDataURLs[2] = signatureDataUrl1;
    }

    setSignatureDataUrls(newSignatureDataURLs);
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

  return (
    <>
      <div style={{ border: "2px solid black", position: "relative" }}>
        <Document file={pdfDisplayURL}>
          <Page
            pageNumber={1}
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

              if (x >= 255 && x <= 620 && y >= 305 && y <= 335) {
                setIsShowingField12(true);
                showSignaturePopup();
              } else if (x >= 255 && x <= 620 && y >= 340 && y <= 370) {
                setIsShowingField12(false);
                showSignaturePopup();
              }
            }}
          />
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
          Download
        </Button>
      </div>

      <SignatureModal
        isOpen={isPopupOpen}
        isShowingField12={isShowingField12}
        onClose={() => setIsPopupOpen(false)}
        onSave={onSave}
      />
    </>
  );
}
