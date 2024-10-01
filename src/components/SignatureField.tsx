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
    const canvas = signaturePadRef.current?.canvas.current;
    if (!canvas) {
      console.error("Could not get canvas");
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Could not get context");
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <h2>{title}</h2>
      <div style={{ border: "2px solid black" }}>
        <SignaturePad
          options={{
            minWidth: 4,
            maxWidth: 4
          }}
          canvasProps={{ style: { aspectRatio: "5 / 1" } }}
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
            fontSize: 18
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
