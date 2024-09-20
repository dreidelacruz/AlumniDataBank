import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PersonalDetailsProfile } from "./inside-profile-components/PersonalDetailsProfile";
import AvatarProfile from "./inside-profile-components/AvatarProfile";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BtnResetPassword from "./inside-profile-components/BtnResetPassword";
import DeletePostDialog from "../home-components/add-post-components/DeletePostDialog";
import sanitizeHtml from "sanitize-html";
import Linkify from "react-linkify";
import React from "react";

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

function AlumniProfile({ id }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  let alumniCurrentData = JSON.parse(localStorage.getItem("alumni") || "[]");

  const [showDetails, setShowDetails] = useState(() => {
    const storedShowDetails = localStorage.getItem(`alumniShowDetails_${id}`);
    return storedShowDetails !== null ? JSON.parse(storedShowDetails) : true;
  });
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up("lg"));

  const handleShowDetailsToggle = () => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    localStorage.setItem(
      `alumniShowDetails_${id}`,
      JSON.stringify(newShowDetails)
    );
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const companyNameInputRef = useRef<HTMLInputElement>(null);
  const companyAddressInputRef = useRef<HTMLInputElement>(null);
  const quoteInputRef = useRef<HTMLInputElement>(null);
  const proofPhotoRef = useRef<HTMLInputElement>(null);

  function handleOpenDialog(postId: string) {
    setSelectedPostId(postId);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5001/api/Account/get-current-user/${id}`
        );
        setProfileData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleEditClick = () => {
    if (alumniCurrentData.id === profileData?.id) {
      setIsEditing((prevIsEditing) => !prevIsEditing);
    } else {
      alert("You are not authorized to edit this profile.");
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleSaveClick = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    // Gather the updated data from the input fields
    const updatedData = {
      // Add the properties you want to update, e.g.:
      email: profileData.email,
      displayName: nameInputRef.current?.value || profileData.displayName,
      companyName:
        companyNameInputRef.current?.value || profileData.companyName,
      companyAddress:
        companyAddressInputRef.current?.value || profileData.companyAddress,
      quote: quoteInputRef.current?.value || profileData.quote,
      phoneNumber:
        phoneNumberInputRef.current?.value || profileData.phoneNumber,
    };

    try {
      await axios.put(
        `https://localhost:5001/api/Account/alumni/update/`,
        updatedData
      );
      setIsEditing(false);
      setProfileData({ ...profileData, ...updatedData });
    } catch (error) {
      console.error("Error updating profile data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const sortedJobPosts = profileData.jobPosts.sort(
    (a: any, b: any) =>
      new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  const splitAndLinkifyDescription = (description: any) => {
    const lines = description.split("\n");

    const sanitizeOptions = {
      allowedTags: ["a", "b", "i", "em", "strong", "p", "br"], // Whitelist of allowed HTML tags
      allowedAttributes: {
        a: ["href", "target", "rel"], // Only allow 'href', 'target', and 'rel' attributes for anchor tags
      },
      allowedSchemes: ["http", "https"], // Only allow 'http' and 'https' schemes in links
      allowedSchemesByTag: {}, // Disable all schemes for tags other than 'a'
      exclusiveFilter: (frame: any) => !frame.text.trim(), // Remove empty text nodes
    };

    return lines.map((line: any, index: any) => (
      <React.Fragment key={index}>
        <Linkify
          options={{
            defaultProtocol: "https",
            componentDecorator: (
              decoratedHref: any,
              decoratedText: any,
              key: any
            ) => (
              <a
                href={decoratedHref}
                target="_blank"
                rel="noopener noreferrer"
                key={key}
              >
                {decoratedText}
              </a>
            ),
          }}
        >
          {sanitizeHtml(line, sanitizeOptions)}
        </Linkify>
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        <Card
          sx={{
            p: 2,
            border: "2px solid black",
            borderWidth: "1px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "fit-content",
            maxWidth: { xs: "420px", sm: "420px", md: "500px" },
          }}
        >
          <AvatarProfile id={id} />
          {alumniCurrentData.id === profileData?.id && (
            <Box sx={{ justifyContent: "center", m: 2 }}>
              <Button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                variant="contained"
                size="small"
                sx={{ borderRadius: "20px" }}
              >
                {isSaving ? (
                  <CircularProgress size={20} color="info" />
                ) : isEditing ? (
                  "Save"
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </Box>
          )}

          {alumniCurrentData.id === profileData?.id && (
            <Box sx={{ justifyContent: "center", m: 2 }}>
              <Button onClick={handleShowDetailsToggle} sx={{fontSize:10}}>
                {showDetails ? "Hide Contact Details" : "Show Contact Details"}
              </Button>
            </Box>
          )}

          <PersonalDetailsProfile
            isEditing={isEditing}
            profileData={profileData}
            nameInputRef={nameInputRef}
            companyNameInputRef={companyNameInputRef}
            companyAddressInputRef={companyAddressInputRef}
            quoteInputRef={quoteInputRef}
            phoneNumberInputRef={phoneNumberInputRef}
            alumniId={id}
            showDetails={showDetails}
          />
          {alumniCurrentData.id === profileData?.id && (
            <Box>
              <BtnResetPassword />
            </Box>
          )}
        </Card>

        <Card
          sx={{
            p: 2,
            textAlign: "center",
            height: "fit-content",
            // backgroundColor: (theme) =>
            //   alpha(theme.palette.background.paper, 0.7),
          }}
        >
          <Box sx={{ justifyContent: "center" }}>
            <Typography variant="h4" fontWeight="bold">
              Job Posts
            </Typography>
          </Box>
          {sortedJobPosts.length === 0 ? (
            <Card
              sx={{
                mt: 2,
                border: "2px solid black",
                borderWidth: "1px",
                textAlign: "left",
                maxWidth: { xs: "100%", sm: "300px", md: "630px" },
                minHeight: "200px", // Set a minimum height for the card
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  No job posts available.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            sortedJobPosts.map((jobPost: any) => (
              <Card
                key={jobPost.id}
                sx={{
                  mt: 2,
                  border: "2px solid black",
                  borderWidth: "1px",
                  textAlign: "left",
                  maxWidth: { xs: "100%", sm: "300px", md: "630px" },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: "red" }}
                      aria-label="alumni-avatar"
                      src={profileData.userPhoto}
                    ></Avatar>
                  }
                  action={
                    <>
                      {alumniCurrentData.id === jobPost.appUserId && (
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenDialog(jobPost.id)}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </>
                  }
                  title={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        wordBreak: "break-word",
                      }}
                    >
                      {jobPost.jobTitle}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" fontStyle="italic">
                      {profileData.displayName} - {formatDate(jobPost.created)}
                    </Typography>
                  }
                />

                <CardContent sx={{ minWidth: isWeb ? "700px" : "auto" }}>
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {splitAndLinkifyDescription(jobPost.description)}
                  </Typography>
                </CardContent>
                {jobPost.userPhoto && (
                  <CardMedia
                    component="img"
                    image={jobPost.userPhoto?.url}
                    alt="User photo"
                    sx={{
                      height: "420px", // Adjust the height as per your requirement
                      objectFit: "cover", // Maintain aspect ratio and cover the container
                    }}
                  />
                )}
                {jobPost.jobFile && (
                  <CardActions disableSpacing>
                    <Button
                      onClick={() => window.open(jobPost.jobFile?.url)}
                      startIcon={<FileDownloadIcon />}
                    >
                      download here
                    </Button>
                  </CardActions>
                )}
              </Card>
            ))
          )}
        </Card>
      </Stack>
      <>
        <DeletePostDialog
          open={openDialog}
          postId={selectedPostId}
          alumniData={profileData.jobPosts}
          setAlumniData={(newData: any[]) =>
            setProfileData({ ...profileData, jobPosts: newData })
          }
          handleCloseDialog={handleCloseDialog}
        />
      </>
    </>
  );
}

export default AlumniProfile;
