"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface CertificateQRCodeProps {
  guid: string;
}

export const CertificateQRCode = ({ guid }: CertificateQRCodeProps) => {
  const [qrCodeValue, setQRCodeValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQRCodeValue(`${window.location.href.replace(guid, "certificate")}`);
    }
  }, [guid]);
  return <QRCode value={qrCodeValue} />;
};
