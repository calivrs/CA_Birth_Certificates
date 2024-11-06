import { Button } from "@mui/material";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => unknown;
}

export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  return isOpen ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "hidden",
        padding: 32,
        gap: 8,
        border: "none !important",
        outline: "none !important"
      }}
    >
      <p>
        Review all the details on Page 1. If you agree, go to Page 2 and tap on
        the appropriate yellow field, sign and submit
      </p>

      <Button
        style={{
          backgroundColor: "blue",
          color: "white",
          textTransform: "none",
          borderRadius: 4,
          fontSize: 18
        }}
        onClick={onClose}
      >
        OK
      </Button>
    </div>
  ) : null;
};
