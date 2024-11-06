import { Button, Modal } from "@mui/material";
import { SignatureField } from "./SignatureField";
import { useRef } from "react";
import SignaturePad from "react-signature-pad-wrapper";

interface SignatureModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => unknown;
  onSave: (signatureDataUrl: string) => unknown;
}

export const SignatureModal = ({
  isOpen,
  title,
  onClose,
  onSave
}: SignatureModalProps) => {
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const onSaveClicked = () => {
    const signatureDataUrl =
      signaturePadRef.current?.canvas.current?.toDataURL("image/png");
    if (!signatureDataUrl) {
      console.error("Unable to get signature data URL 1");
      return;
    }
    onSave(signatureDataUrl);
  };

  const renderSaveButton = () => {
    return (
      <Button
        style={{
          backgroundColor: "blue",
          color: "white",
          textTransform: "none",
          borderRadius: 4,
          fontSize: 18
        }}
        onClick={onSaveClicked}
      >
        Save
      </Button>
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        overflowY: "scroll"
      }}
    >
      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "hidden",
          padding: 32,
          gap: 8,
          border: "none !important",
          outline: "none !important"
        }}
      >
        <SignatureField
          title={title}
          signaturePadRef={signaturePadRef}
          saveButton={renderSaveButton()}
        />
      </div>
    </Modal>
  );
};
