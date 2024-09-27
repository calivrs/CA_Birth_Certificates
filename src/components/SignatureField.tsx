import { Button } from "@mui/material";
import { MutableRefObject, ReactElement } from "react";
import SignaturePad from "react-signature-pad-wrapper";

interface SignatureFieldProps {
  title: string;
  signaturePadRef: MutableRefObject<SignaturePad | null>;
  saveButton: ReactElement | null;
}

export const SignatureField = ({
  title,
  signaturePadRef,
  saveButton
}: SignatureFieldProps) => {
  const clearCanvas = () => {
    signaturePadRef.current?.canvas.current?.getContext("2d")?.reset();
  };

  return (
    <>
      <p>{title}</p>
      <div style={{ border: "2px solid black" }}>
        <SignaturePad
          options={{
            minWidth: 4,
            maxWidth: 4
          }}
          ref={signaturePadRef}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 24
        }}
      >
        <Button
          style={{
            backgroundColor: "red",
            color: "white",
            textTransform: "none",
            borderRadius: 4,
            fontSize: 24
          }}
          onClick={clearCanvas}
        >
          Clear
        </Button>
        {saveButton}
      </div>
    </>
  );
};
