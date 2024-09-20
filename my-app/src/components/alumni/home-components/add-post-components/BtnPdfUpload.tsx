import { CloudUpload } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import {  useState } from "react";


function BtnPdfUpload(props: any) {
  const { setUploadPDF } = props;
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const handlePDFChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10485760) {
        alert("File size too large. Maximum size is 10 MB.");
      } else {
        setUploadPDF(file);
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
      }
    }
  };

  const handleCancelUpload = () => {
    setUploadPDF(null);
    setPdfUrl('');
  };

  return (
    <div>
      <Typography variant="body2" color="grey" textAlign="left">
      Upload files (PDF format, up to 10MB only)
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        size="small"
      >
        Upload Files
        <input
          hidden
          accept=".pdf"
          type="file"
          onChange={handlePDFChange}
          name="file"
          max-size="10485760"
        />
      </Button>
      {pdfUrl && (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            Uploaded PDF file
          </a>
          <Button
            size="small"
            color="primary"
            style={{ marginLeft: '10px' }}
            onClick={handleCancelUpload}
          >
            Cancel upload
          </Button>
        </div>
      )}
    </div>
  );
}

export default BtnPdfUpload;