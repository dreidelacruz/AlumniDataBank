import { Button, IconButton, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";


function BtnImageUpload(props: any) {
  const { setUploadImage } = props;
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    setUploadImage(file);
  
    if (file instanceof Blob || file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadImage(null);
    setImageUrl('');
  };

  return (
    <div>
      <Typography variant="body2" color="grey" textAlign="left">
        Add Image
      </Typography>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <PhotoCamera />
      </IconButton>
      {imageUrl && (
        <>
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ maxWidth: "100%", height: "420px" }}
        />
        <Button onClick={handleRemoveImage}>
          cancel image
        </Button>
        </>
      )}
    </div>
  );
}

export default BtnImageUpload;
