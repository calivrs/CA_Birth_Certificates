"use client";

import "core-js/actual/promise/with-resolvers";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// For local development, change to ''
const DEPLOYMENT_PREFIX = "/CA_Birth_Certificates";

pdfjs.GlobalWorkerOptions.workerSrc = `${DEPLOYMENT_PREFIX}/pdf.worker.mjs`;

import { PDFDocument } from "pdf-lib";
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
  // Iniitally the URL of the static file, then gets changed to an object URL when we add each signature
  const [pdfURL, setPdfURL] = useState(PDF_URL);
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [pageWidth, setPageWidth] = useState(400);
  const [isShowingField12, setIsShowingField12] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const updatePageWidth = () => {
    setPageWidth(window.innerWidth);
  };

  const initializePdfBytes = () => {
    fetch(PDF_URL).then((res) => res.arrayBuffer().then(setPdfBuffer));
  };

  useEffect(() => {
    updatePageWidth();
    initializePdfBytes();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  const showSignaturePopup = () => {
    setIsPopupOpen(true);
  };

  const onSave = async (
    signatureDataUrl1: string,
    signatureDataUrl2?: string
  ) => {
    const pdfDoc = await PDFDocument.load(pdfBuffer!);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const pageHeight = firstPage.getHeight();

    const signatureImageArray1 = dataURLToUint8Array(signatureDataUrl1);
    const signatureImage1 = await pdfDoc.embedPng(signatureImageArray1);

    firstPage.drawImage(signatureImage1, {
      x: 175,
      y: pageHeight - (isShowingField12 ? 207 : 233) - 15,
      width: 45,
      height: 15
    });

    if (signatureDataUrl2) {
      const signatureImageArray2 = dataURLToUint8Array(signatureDataUrl2);
      const signatureImage2 = await pdfDoc.embedPng(signatureImageArray2);

      firstPage.drawImage(signatureImage2, {
        x: 275,
        y: pageHeight - 207 - 15,
        width: 45,
        height: 15
      });
    }

    const modifiedPDFBytes = await pdfDoc.save();

    const blob = new Blob([modifiedPDFBytes], {
      type: "application/pdf"
    });
    const modifiedPDFBuffer = await blob.arrayBuffer();
    setPdfBuffer(modifiedPDFBuffer);
    setPdfURL(URL.createObjectURL(blob));
    setIsPopupOpen(false);
  };

  const downloadModifiedPDF = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfURL;
    downloadLink.download = "birth_certificate_sample_signed.pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return pdfBuffer === null ? (
    "Loading..."
  ) : (
    <>
      <div style={{ border: "2px solid black" }}>
        <Document file={pdfURL}>
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
