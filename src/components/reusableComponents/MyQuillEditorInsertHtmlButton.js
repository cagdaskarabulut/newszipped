import React, { useEffect, useState } from "react";

const { useQuill } = require("react-quilljs");

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Button, Fade, Input, Modal } from "@mui/material";
import { styled, css } from "@mui/system";

export default function MyQuillEditorInsertHtmlButton({ quill }) {
  const [open, setOpen] = useState(false);
  const [htmlInputValue, setHtmlInputValue] = useState("");

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const ModalContent = styled("div")(
    ({ theme }) => css`
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === "dark"
          ? "rgb(0 0 0 / 0.5)"
          : "rgb(0 0 0 / 0.2)"};
      padding: 24px;
      color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }

      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `
  );

  const handleHtmlInsertAction = () => {
    setOpen(false);
    quill.clipboard.dangerouslyPasteHTML(5, htmlInputValue);
  };

  return (
    <>
      <Button variant="contained" type="submit" onClick={() => setOpen(true)}>
        Add Html
      </Button>
      <Modal open={open} onClose={() => setOpen(true)} closeAfterTransition>
        <Fade in={open}>
          <ModalContent sx={{ width: 400 }}>
            <Input
              value={htmlInputValue}
              onChange={(event) => setHtmlInputValue(event.target.value)}
              multiline
              maxRows={10}
              placeholder="Bu alana html kodunuzu girebilirsiniz…"
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              onClick={() => setOpen(false)}
            >
              İptal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleHtmlInsertAction()}
            >
              Sakla
            </Button>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
}
