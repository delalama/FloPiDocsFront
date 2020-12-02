import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useDocumentFields from "../request/useDocumentFields";

const element = document.createElement("div");
document.body.appendChild(element);

export default function ExportButton(props) {
  const { exportDocument } = useDocumentFields();
  function onDownload() {
    exportDocument(props.documentId);
  }
  return (
    <div>
      <Button
        onClick={() => {
          onDownload();
        }}
        variant="contained" color="primary"
      >
        EXPORT
      </Button>
    </div>
  );
}
