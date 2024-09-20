import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
import DeletePostDialog from "./add-post-components/DeletePostDialog";
import SearchContext from "../../../contexts/SearchContext";
import { Link } from "react-router-dom";
import jaroWinkler from "jaro-winkler";
import sanitizeHtml from "sanitize-html";
import Linkify from "react-linkify";
const { get: levenshtein } = require("fast-levenshtein");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
}));

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

function PostCard(props: any) {
  const { searchValue } = useContext(SearchContext);
  const [alumniData, setAlumniData] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [filteredAlumniData, setFilteredAlumniData] = useState<any[]>([]);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up("lg"));

  function handleOpenDialog(postId: string) {
    setSelectedPostId(postId);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  useEffect(() => {
    async function fetchJobPosts() {
      try {
        const alumniResponse = await axios.get(
          "https://localhost:5001/api/Account/alumni/all"
        );
        const allJobPosts = alumniResponse.data.data.flatMap((alumni: any) =>
          alumni.jobPosts.map((jobPost: any) => ({
            ...jobPost,
            alumniDisplayName: alumni.displayName,
            alumniUserPhoto: alumni.userPhoto,
          }))
        );
        const sortedJobPosts = allJobPosts.sort((a: any, b: any) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB.getTime() - dateA.getTime();
        });
        setAlumniData(sortedJobPosts);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    }

    fetchJobPosts();
  }, [props.refreshPosts]);

  interface AbbreviationMapping {
    [key: string]: string;
  }

  const abbreviationMapping: AbbreviationMapping = {
    "Sr Software Engineer": "Senior Software Engineer",
    "Sr. SW Engineer": "Senior Software Engineer",
    "Jr.": "junior",
    "C#": "C Sharp",
    "sw": "software",
    "sr": "senior",
    "jr": "junior",
    "engr.": "engineer",
    "engrs": "engineer",
    "engr": "engineer",
    "Sr.": "Senior",
    ".NET": "dotnet",
    "QA": "Quality Assurance",
    "UI":"user interface",
    "UX":"user experience"
  };

  function standardizeString(input: string): string {
    const words = input.toLowerCase().split(" ");
    const standardizedWords = words.map((word) => {
      const matchingKey = Object.keys(abbreviationMapping).find(
        (key) => key.toLowerCase() === word
      );
      return matchingKey
        ? abbreviationMapping[matchingKey].toLowerCase()
        : word;
    });
    return standardizedWords.join(" ");
  }

  useEffect(() => {
    const thresholdRatio = 0.6;
    const filteredData = alumniData
      .map((jobPost: any) => {
        const query = standardizeString(searchValue);
        const jobTitle = standardizeString(jobPost.jobTitle);

        if (query === "") {
          return { ...jobPost, matchType: 0 };
        }

        if (query === jobTitle) {
          return { ...jobPost, matchType: 1 };
        }

        if (jobTitle.includes(query)) {
          return { ...jobPost, matchType: 2 };
        }

        const jaroWinklerSimilarity = jaroWinkler(query, jobTitle);
        const levenshteinDistance = levenshtein(query, jobTitle);
        const levenshteinSimilarity =
          1 - levenshteinDistance / Math.max(query.length, jobTitle.length);

        const jaroWinklerWeight = 0.5;
        const levenshteinWeight = 0.5;

        const combinedScore =
          jaroWinklerWeight * jaroWinklerSimilarity +
          levenshteinWeight * levenshteinSimilarity;
        console.log("Jaro-Winkler similarity:", jaroWinklerSimilarity);
        console.log("Levenshtein similarity:", levenshteinSimilarity);
        console.log("Combined score:", combinedScore);
        if (combinedScore >= thresholdRatio) {
          return { ...jobPost, matchType: 3 };
        }

        const jobTitleWords = jobTitle.split(" ");

        const partialMatch = jobTitleWords.some((word: string) => {
          const wordJaroWinklerSimilarity = jaroWinkler(query, word);
          const wordLevenshteinDistance = levenshtein(query, word);
          const wordLevenshteinSimilarity =
            1 - wordLevenshteinDistance / Math.max(query.length, word.length);

          const wordCombinedScore =
            jaroWinklerWeight * wordJaroWinklerSimilarity +
            levenshteinWeight * wordLevenshteinSimilarity;

          return wordCombinedScore >= thresholdRatio;
        });

        if (partialMatch) {
          return { ...jobPost, matchType: 4 };
        }

        return null;
      })
      .filter((jobPost: any) => jobPost !== null)
      .sort((a: any, b: any) => a.matchType - b.matchType);

    setFilteredAlumniData(filteredData);
  }, [searchValue, alumniData]);

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

  let alumniCurrentData = JSON.parse(localStorage.getItem("alumni") || "[]");

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ p: 1 }}
        >
          {filteredAlumniData.map((jobPost: any) => (
            <Grid item xs={2} sm={4} md={4} key={jobPost.id}>
              <Item>
                <Card
                  sx={{ maxWidth: { xs: "100%", sm: "300px", md: "630px" } }}
                >
                  <CardHeader
                    avatar={
                      <Link to={`/alumni-profile/${jobPost.appUserId}`}>
                        <Avatar
                          sx={{ bgcolor: "red" }}
                          aria-label="alumni-avatar"
                          src={jobPost.alumniUserPhoto}
                        ></Avatar>
                      </Link>
                    }
                    action={
                      <>
                        {alumniCurrentData.id == jobPost.appUserId && (
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
                        {jobPost.alumniDisplayName} -
                        {formatDate(jobPost.created)}
                      </Typography>
                    }
                  />
                  <CardContent sx={{ minWidth: isWeb ? "630px" : "auto" }}>
                    <Typography
                      variant="body1"
                      sx={{ wordBreak: "break-word" }}
                    >
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
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <>
        <DeletePostDialog
          open={openDialog}
          postId={selectedPostId}
          alumniData={alumniData}
          setAlumniData={setAlumniData}
          handleCloseDialog={handleCloseDialog}
        />
      </>
    </div>
  );
}

export default PostCard;

// sx={{ minWidth: isWeb ? "500px" : "auto" }}
