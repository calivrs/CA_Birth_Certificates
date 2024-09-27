import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CA Birth Certificates",
  description: "E-signatures for California birth certificates"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>California Electronic Birth Registration System</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
