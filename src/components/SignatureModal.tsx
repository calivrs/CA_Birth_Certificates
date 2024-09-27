import { Button, Modal } from "@mui/material";
import { SignatureField } from "./SignatureField";
import { useRef } from "react";
import SignaturePad from "react-signature-pad-wrapper";

interface SignatureModalProps {
  isOpen: boolean;
  isShowingField12: boolean;
  onClose: () => unknown;
  onSave: (signatureDataUrl1: string, signatureDataUrl2?: string) => unknown;
}

export const SignatureModal = ({
  isOpen,
  isShowingField12,
  onClose,
  onSave
}: SignatureModalProps) => {
  const signaturePad1Ref = useRef<SignaturePad | null>(null);
  const signaturePad2Ref = useRef<SignaturePad | null>(null);

  const onSaveClicked = () => {
    const signatureDataUrl1 =
      signaturePad1Ref.current?.canvas.current?.toDataURL("image/png");
    const signatureDataUrl2 =
      signaturePad2Ref.current?.canvas.current?.toDataURL("image/png");
    if (!signatureDataUrl1) {
      console.error("Unable to get signature data URL 1");
      return;
    }
    onSave(signatureDataUrl1, signatureDataUrl2);
  };

  const renderSaveButton = () => {
    return (
      <Button
        style={{
          backgroundColor: "blue",
          color: "white",
          textTransform: "none",
          borderRadius: 4,
          fontSize: 24
        }}
        onClick={onSaveClicked}
      >
        Save
      </Button>
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          width: "75%",
          backgroundColor: "white",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "hidden",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 64,
          gap: 16,
          border: "none !important",
          outline: "none !important"
        }}
      >
        <SignatureField
          title={
            isShowingField12
              ? "Parent 1 Signature"
              : "13A. ATTENDANT/CERTIFIER - SIGNATURE AND DEGREE OR TITLE"
          }
          signaturePadRef={signaturePad1Ref}
          saveButton={isShowingField12 ? null : renderSaveButton()}
        />

        {isShowingField12 ? (
          <SignatureField
            title="Parent 2 Signature"
            signaturePadRef={signaturePad2Ref}
            saveButton={renderSaveButton()}
          />
        ) : null}
      </div>
    </Modal>
  );
};
