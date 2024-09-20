import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box, CircularProgress, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useUserPhoto } from "../../../../contexts/UserPhotoContext";

function AvatarProfile({ id }: { id: string }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelUpload, setCancelUpload] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { userPhoto, setUserPhoto } = useUserPhoto();

  const alumniData = localStorage.getItem("alumni") || "";
  let parsedData = null;

  try {
    parsedData = JSON.parse(alumniData);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }

  const loggedInUserId = parsedData ? parsedData.id : null;

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5001/api/Account/get-current-user/${id}`
        );
        setUserPhoto(response.data.userPhoto);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [id, setUserPhoto, refresh]);

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowUploadButton(true);

      const reader = new FileReader();
      reader.onload = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setCancelUpload(true);
    setSelectedFile(null);
    setShowUploadButton(false);
    if (alumniData) {
      const parsedData = JSON.parse(alumniData);
      setUserPhoto(parsedData.userPhoto);
    }
  };

  const handleUpload = () => {
    if (selectedFile && id) {
      setLoading(true); // Set loading to true when uploading the image
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(`https://localhost:5001/api/Account/add-photo/${id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle success or error
          localStorage.setItem("userPhoto", data.url); // Update localStorage
          setUserPhoto(data.url); // Update the userPhoto state

          // Update localStorage("alumni").userPhoto
          const alumniData = localStorage.getItem("alumni");
          if (alumniData) {
            const parsedData = JSON.parse(alumniData);
            parsedData.userPhoto = data.url;
            localStorage.setItem("alumni", JSON.stringify(parsedData));
          }

          setRefresh(!refresh);
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          //window.location.reload()
        });
    }
  };

  return (
    <Card
      sx={{
        m: 2,
        p: 3,
        border: "2px solid black",
        borderWidth: "1px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={userPhoto}
        sx={{
          width: "220px",
          height: "220px",
          margin: "auto",
        }}
      />
      {id === loggedInUserId && !loading && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileInputChange}
          />
          <PhotoCamera />
        </IconButton>
      )}
{id === loggedInUserId && id !== null && showUploadButton && (
  <>
    {selectedFile && !loading && (
    <>
        <Button onClick={handleUpload}>Change picture</Button>
        <Button
          onClick={handleCancelUpload}
          disabled={loading}
          sx={{ marginLeft: 1 }}
        >
          Cancel
        </Button>
  </>
    )}
  </>
)}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
}

export default AvatarProfile;
