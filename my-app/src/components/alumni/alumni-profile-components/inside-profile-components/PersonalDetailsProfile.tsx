import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const StyledTextField = styled(TextField)({
  margin: "5px",
  padding: "2px",
});
interface ProfileData {
  displayName: string;
  email: string;
  userPhoto: string;
  year: string;
  course: string;
  companyName: string;
  companyAddress: string;
  quote: string;
  phoneNumber: string;
}

interface PersonalDetailsProps {
  isEditing: boolean;
  profileData: ProfileData;
  nameInputRef: React.RefObject<HTMLInputElement>;
  companyNameInputRef: React.RefObject<HTMLInputElement>;
  companyAddressInputRef: React.RefObject<HTMLInputElement>;
  quoteInputRef: React.RefObject<HTMLInputElement>;
  phoneNumberInputRef: React.RefObject<HTMLInputElement>;
  alumniId: string;
  showDetails: boolean;
}

export const PersonalDetailsProfile: React.FC<PersonalDetailsProps> = ({
  isEditing,
  profileData,
  nameInputRef,
  companyNameInputRef,
  companyAddressInputRef,
  quoteInputRef,
  phoneNumberInputRef,
  alumniId,
  showDetails,
}) => {
  const [proofPhoto, setProofPhoto] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | "">("");
  const [isUploading, setIsUploading] = useState(false);

  const alumniData = localStorage.getItem("alumni") || "";
  let parsedData: any = null;

  try {
    parsedData = JSON.parse(alumniData);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }

  const loggedInUserId = parsedData ? parsedData.id : null;

  useEffect(() => {
    const fetchProofPhoto = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5001/api/Account/get-current-user/${alumniId}`
        );
        setProofPhoto(response.data.proofPhoto);
        console.log("PHOTOOO", response.data.proofPhoto);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProofPhoto();
  }, [alumniId, refresh]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setProofPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    setIsUploading(true); // Start loading

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Upload the file to your backend and get the response
      const response = await axios.post(
        `https://localhost:5001/api/Account/add-proof-photo/${loggedInUserId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImageUrl = response.data.proofPhoto; // Assuming the server returns the URL in 'proofPhoto'

      // Handle success by updating proofPhoto and localStorage
      setProofPhoto(uploadedImageUrl);

      // Update localStorage("alumni") with the new proofPhoto URL
      const alumniData = localStorage.getItem("alumni");
      if (alumniData) {
        const parsedData = JSON.parse(alumniData);
        parsedData.proofPhoto = uploadedImageUrl; // Use the uploaded URL from response
        localStorage.setItem("alumni", JSON.stringify(parsedData));
      }

      setRefresh(!refresh);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false); // End loading
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null); // Clear the selected file
    if (alumniData) {
      const parsedData = JSON.parse(alumniData);
      setProofPhoto(parsedData.proofPhoto);
      setRefresh(!refresh);
    } // Clear the preview
  };
  return (
    <>
      <Typography fontSize={12} fontStyle="italic">
        Personal Details
      </Typography>
      <Box sx={{ justifyContent: "center" }}>
        {isEditing ? (
          <StyledTextField
            label="Name"
            defaultValue={profileData.displayName}
            inputRef={nameInputRef}
          />
        ) : (
          <Typography fontWeight="bold" variant="h4">
            {profileData.displayName}
          </Typography>
        )}
      </Box>
      <Box sx={{ justifyContent: "center" }}>
        <Typography>{`Graduated in ${profileData.course.toUpperCase()} - ${
          profileData.year
        }`}</Typography>
      </Box>
      <Divider />
      {showDetails && (
        <>
          <Box sx={{ justifyContent: "center", mt: 2 }}>
            <Typography fontSize={12} fontStyle="italic">
              Contacts
            </Typography>
          </Box>
          <Box sx={{ justifyContent: "center" }}>
            <Typography>{profileData.email}</Typography>
          </Box>
          <Box sx={{ justifyContent: "center" }}>
            <Typography sx={{ mt: 1 }} fontStyle="italic" fontSize={12}>
              phone number
            </Typography>
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "fit-content",
                  margin: "auto",
                }}
              >
                <PhoneInput
                  country={"ph"}
                  value={profileData.phoneNumber}
                  inputProps={{
                    name: "phoneNumber",
                    ref: phoneNumberInputRef,
                  }}
                  placeholder="Enter phone number"
                  inputStyle={{ width: "85%" }}
                />
              </div>
            ) : (
              <Typography>{profileData.phoneNumber}</Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ justifyContent: "center", mt: 4, wordWrap: "break-word" }}>
            {isEditing ? (
              <StyledTextField
                label="Company Name"
                defaultValue={profileData.companyName}
                inputRef={companyNameInputRef}
              />
            ) : (
              <>
                <Typography fontStyle="italic" fontSize={12}>
                  Company Name:
                </Typography>
                <Typography>{profileData.companyName || "N/A"}</Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              wordWrap: "break-word",
            }}
          >
            {isEditing ? (
              <StyledTextField
                label="Company Adress"
                defaultValue={profileData.companyAddress}
                inputRef={companyAddressInputRef}
              />
            ) : (
              <>
                <Typography fontStyle="italic" fontSize={12}>
                  Company Address:
                </Typography>
                <Typography>{profileData.companyAddress || "N/A"}</Typography>
              </>
            )}
          </Box>
          {/* dito proof of photo kung kasama sa hide*/}
        </>
      )}
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          wordWrap: "break-word",
        }}
      >
        {isEditing ? (
          <StyledTextField
            label="Quotes"
            defaultValue={profileData.quote}
            inputRef={quoteInputRef}
            multiline
            rows={5}
          />
        ) : (
          <Typography
            sx={{
              borderLeft: "4px solid #ccc",
              paddingLeft: "10px",
              fontStyle: "italic",
              maxWidth: "200px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {profileData.quote &&
              profileData.quote.split("\n").map((line: any, index: any) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </Typography>
        )}
      </Box>
      <Divider sx={{ marginTop: 1 }} />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontStyle="italic" fontSize={12}>
          Proof of Employment
        </Typography>
        <a href={proofPhoto} target="_blank" rel="noopener noreferrer">
  <Box
    sx={{
      position: "relative",
      display: "inline-block",
      maxWidth: "200px",
      maxHeight: "200px",
      cursor: "pointer",
      '&:hover .overlay': {
        opacity: 0.7,  // Show overlay on hover
      },
    }}
  >
    {/* Image */}
    <img
      src={proofPhoto}
      alt="Proof of employment"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    {/* Dark overlay with text */}
    <Box
      className="overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background overlay
        opacity: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.3s ease",  // Smooth transition for overlay
      }}
    >
      <Typography
        fontStyle="italic" fontSize={10}
        sx={{ color: "white" }}
      >
        click to view
      </Typography>
    </Box>
  </Box>
</a>
      </Box>
      {alumniId === loggedInUserId && (
        <>
          {!isUploading && (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
              <PhotoCamera />
            </IconButton>
          )}
          {/* Show loading spinner when uploading */}
          {isUploading ? (
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
          ) : (
            selectedFile && (
              <>
                <Button onClick={handleUploadClick}>Upload Image</Button>
                <Button onClick={handleCancelUpload}>Cancel</Button>
              </>
            )
          )}
        </>
      )}
    </>
  );
};
