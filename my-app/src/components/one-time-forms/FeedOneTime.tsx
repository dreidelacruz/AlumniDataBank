import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import RdoFirstJobRelatedCourse from "./first-job-details-components/RdoFirstJobRelatedCourse";
import RdoHowLongLandJob from "./first-job-details-components/RdoHowLongLandJob";
import RdoHowFindJob from "./first-job-details-components/RdoHowFindJob";
import RdoDifficultiesFirstJob from "./first-job-details-components/RdoDifficultiesFirstJob";
import RdoStillInFirstJob from "./first-job-details-components/RdoStillInFirstJob";
import RdoHowLongStayJob from "./first-job-details-components/RdoHowLongStayJob";
import ChkReasonsFirstJob from "./first-job-details-components/ChkReasonsFirstJob";
import OneTimeEducationDetails from "./OneTimeEducationDetails";
import axios from "axios";
import PostCard from "../alumni/home-components/PostCard";

const StyledBox = styled(Box)({
  borderRadius: "5px",
  alignItems: "left",
  display: "flex",
});

interface BlurredDivProps {
  blur: boolean;
}

const BlurredDiv = styled("div")<BlurredDivProps>(({ blur }) => ({
  filter: blur ? "blur(4px)" : "none",
  pointerEvents: blur ? "none" : "auto",
  userSelect: blur ? "none" : "auto",
}));

const OverlayText = styled("div")({
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 1,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "1rem",
  borderRadius: "0.5rem",
});

const reasonFirstJobEndpoints: any = {
  salary: "salary",
  careerChallenge: "career-challenge",
  relatedSpecialSkil: "related-special-skill",
  proximtyMyResidence: "proximity-my-residence",
  other: "other",
};

const competenciesEndpoints: any = {
  communicationSkill: "communication-skill",
  criticalThinkingSkill: "critical-thinking-skill",
  humanRelationSkill: "human-relation-skill",
  entrepreneurialSkill: "entrep-skill",
  itSkill: "it-skill",
  problemSolvingSkill: "problem-solving-skill",
  otherSkill: "other-skill",
};

function FeedOneTime(props: any) {
  const [open, setOpen] = useState(false);

  const [jobRelatedCourse, setJobRelatedCourse] = useState("");
  const [howLongLandJob, setHowLongLandJob] = useState("");
  const [howFindJob, setHowFindJob] = useState("");
  const [difficultiesFirstJob, setDifficultiesFirstJob] = useState("");
  const [stillInFirstJob, setStillInFirstJob] = useState("");
  const [howLongStayJob, setHowLongStayJob] = useState("");
  const [checkedValuesReasons, setCheckedValuesReasons] = useState<string[]>(
    []
  );

  const [presentJobCourse, setPresentJobCourse] = useState("");
  const [competencies, setCompetencies] = useState<string[]>([]);

  const [generalEducationRating, setGeneralEducationRating] = useState("");
  const [professionalSubjectRating, setProfessionalSubjectRating] =
    useState("");
  const [electiveSubjectRating, setElectiveSubjectRating] = useState("");
  const [itCertificationRating, setItCertificationRating] = useState("");
  const [seminarRating, setSeminarRating] = useState("");
  const [onTheJobTrainingRating, setOnTheJobTrainingRating] = useState("");
  const [yearDatas, setYearDatas] = useState<any[]>([]);

  const storedAlumni = localStorage.getItem("alumni");
  const alumni = storedAlumni ? JSON.parse(storedAlumni) : null;
  const year = alumni?.year;

  const userId = alumni?.id;
  const formSubmittedFlag = `formSubmitted-${userId}`;
  const storedFormSubmitted = localStorage.getItem(formSubmittedFlag);
  const [formSubmitted, setFormSubmitted] = useState(
    storedFormSubmitted === "true"
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const yearResponse = await axios.get("https://localhost:5001/api/Year");
        setYearDatas(yearResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchYears();
  }, []);

  const updateCompetencies = async (competencyCollege: string[]) => {
    const competenciesIdArr = yearDatas
      .filter((yearData) => yearData.graduatedSchoolYear === year)
      .map(
        (yearData) => yearData.educationalDetail.compentencyLearningInCollege.id
      );

    const competenciesId = competenciesIdArr[0];

    for (const competency of competencyCollege) {
      const endpoint = competenciesEndpoints[competency];
      if (endpoint) {
        try {
          await axios.put(
            `https://localhost:5001/api/Educational/competencies-learning-in-college/${endpoint}/${competenciesId}`,
            {
              [competency]: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const updateReasonsForTakingJob = async (reasonsForTakingJob: string[]) => {
    const reasonForFirstJobIdArr = yearDatas
      .filter((yearData) => yearData.graduatedSchoolYear === year)
      .map((yearData) => yearData.firstJobDetail.reasonTakingFirstJob.id);

    const reasonForFirstJobId = reasonForFirstJobIdArr[0];

    for (const reason of reasonsForTakingJob) {
      const endpoint = reasonFirstJobEndpoints[reason];
      if (endpoint) {
        try {
          await axios.put(
            `https://localhost:5001/api/FirstJobDetails/reason-taking-first-job/${endpoint}/${reasonForFirstJobId}`,
            {
              [reason]: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleMainFeedClick = () => {
    if (!formSubmitted) {
      setOpen(true);
    }
  };

  const handleClose = (e: any) => {
    console.log("Dialog box closed");
    e.stopPropagation();
    setOpen(false);
  };

  const convertHowLongLandJobToUrlFormat = (howLongLandJob: any) => {
    const conversionMap: any = {
      lessThanAMonth: "less-than-a-month",
      monthOneToThree: "1-3months",
      monthFourToSix: "4-6months",
      monthSevenToEleven: "7-11months",
      yearOneToTwo: "1-2years",
      yearTwoToThree: "2-3years",
      yearThreeToFour: "3-4years",
      others: "other",
    };
    return conversionMap[howLongLandJob];
  };

  const convertHowFindJobToUrlFormat = (howFindJob: any) => {
    const conversionMap: any = {
      toAnAdvertisement: "to-an-advertisement",
      asWalkInApplicant: "as-walk-in-applicant",
      recommendedBySomeone: "recommended-by-someone",
      informationFromFriends: "information-from-friends",
      arrangedByTheSchool: "arrange-by-the-school",
      familyBusiness: "family-business",
      jobFairForPeso: "job-fair-for-peso",
      other: "other",
    };
    return conversionMap[howFindJob];
  };

  const convertDifficultiesFirstJobToUrlFormat = (
    difficultiesFirstJob: any
  ) => {
    const conversionMap: any = {
      noAvailJob: "no-avail-job",
      lackOfExp: "lack-of-exp",
      lowCompenOffer: "low-compensation-offer",
      lowOpporAdvancement: "low-opp-advancement",
      lackOfSkill: "lack-of-skill",
      other: "other",
    };
    return conversionMap[difficultiesFirstJob];
  };

  const convertHowLongStayJobToUrlFormat = (howLongStayJob: any) => {
    const conversionMap: any = {
      lessThanAMonth: "less-than-a-month",
      monthOneToThree: "1-3months",
      monthFourToSix: "4-6months",
      monthSevenToEleven: "7-11months",
      yearOneToTwo: "1-2years",
      yearTwoToThree: "2-3years",
      yearThreeToFour: "3-4years",
      others: "other",
    };
    return conversionMap[howLongStayJob];
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const jobRelatedCourseIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.firstJobDetail.firstJobRelatedCourse.id);

      const jobRelatedCourseId = jobRelatedCourseIdArr[0];

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/firstjob-related-course/${jobRelatedCourse}/${jobRelatedCourseId}`,
        {
          yes: jobRelatedCourse === "yes" ? 1 : 0,
          no: jobRelatedCourse === "no" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const howLongLandJobIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.firstJobDetail.landFirstJob.id);

      const howLongLandJobId = howLongLandJobIdArr[0];
      const urlFormattedHowLongLandJob =
        convertHowLongLandJobToUrlFormat(howLongLandJob);

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/landfirstjob/${urlFormattedHowLongLandJob}/${howLongLandJobId}`,
        {
          landFirstJob: howLongLandJob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const howFindJobIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.firstJobDetail.findFirstJob.id);

      const howFindJobId = howFindJobIdArr[0];
      const urlFormattedHowFindJob = convertHowFindJobToUrlFormat(howFindJob);

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/findfirstjob/${urlFormattedHowFindJob}/${howFindJobId}`,
        {
          findFirstJob: howFindJob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const difficultiesFirstJobIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map(
          (yearData) => yearData.firstJobDetail.difficultiesEncounterFirstJob.id
        );

      const difficultiesFirstJobId = difficultiesFirstJobIdArr[0];
      const urlFormattedDifficultiesFirstJob =
        convertDifficultiesFirstJobToUrlFormat(difficultiesFirstJob);

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/difficulties-encounter-firstjob/${urlFormattedDifficultiesFirstJob}/${difficultiesFirstJobId}`,
        {
          difficultiesEncounterFirstJob: difficultiesFirstJob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const stillInFirstJobIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.firstJobDetail.currentFirstJob.id);

      const stillInFirstJobId = stillInFirstJobIdArr[0];

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/current-first-job/${stillInFirstJob}/${stillInFirstJobId}`,
        {
          yes: stillInFirstJob === "yes" ? 1 : 0,
          no: stillInFirstJob === "no" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const howLongStayJobIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.firstJobDetail.stayFirstJob.id);

      const howLongStayJobId = howLongStayJobIdArr[0];
      const urlFormattedHowLongStayJob =
        convertHowLongStayJobToUrlFormat(howLongStayJob);

      axios.put(
        `https://localhost:5001/api/FirstJobDetails/stay-firstjob/${urlFormattedHowLongStayJob}/${howLongStayJobId}`,
        {
          stayFirstJob: howLongStayJob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await updateReasonsForTakingJob(checkedValuesReasons);

      const presentJobCourseIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map(
          (yearData) => yearData.educationalDetail.presentJobRelatedCourse.id
        );

      const presentJobCourseId = presentJobCourseIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/present-job-related-course/${presentJobCourse}/${presentJobCourseId}`,
        {
          yes: presentJobCourse === "yes" ? 1 : 0,
          no: presentJobCourse === "no" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await updateCompetencies(competencies);

      const gedIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.ged.id);

      const gedId = gedIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/ged/${generalEducationRating}/${gedId}`,
        {
          ged: generalEducationRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const professionalSubjectIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.professionalSubject.id);

      const professionalSubjectId = professionalSubjectIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/professional-subject/${professionalSubjectRating}/${professionalSubjectId}`,
        {
          professionalSubject: professionalSubjectRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const electiveSubjectIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.electiveSubject.id);

      const electiveSubjectId = electiveSubjectIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/elective-subject/${electiveSubjectRating}/${electiveSubjectId}`,
        {
          electiveSubject: electiveSubjectRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const itCertificationIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.itCertification.id);

      const itCertificationId = itCertificationIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/it-certification/${itCertificationRating}/${itCertificationId}`,
        {
          itCertification: itCertificationRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const seminarIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.seminar.id);

      const seminarId = seminarIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/seminar/${seminarRating}/${seminarId}`,
        {
          seminar: seminarRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const ojtIdArr = yearDatas
        .filter((yearData) => yearData.graduatedSchoolYear === year)
        .map((yearData) => yearData.educationalDetail.ojt.id);

      const ojtId = ojtIdArr[0];

      axios.put(
        `https://localhost:5001/api/Educational/ojt/${onTheJobTrainingRating}/${ojtId}`,
        {
          ojt: onTheJobTrainingRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (checkedValuesReasons.length === 0) {
        alert("Please select at least one reason for taking your first job");
        return;
      }
      if (competencies.length === 0) {
        alert("Please select at least one competency");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
    setFormSubmitted(true);
    setShowSnackbar(true);
    localStorage.setItem(formSubmittedFlag, "true");
  };

  return (
    <div>
      <Box onClick={handleMainFeedClick}>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleFormSubmit}>
            <DialogTitle>
              <Typography variant="h4" fontWeight="bold">
                First Job & Education Details
              </Typography>
              <Typography color="error">
                Please review your answers carefully as this is a one-time form
                submission.
                <br />
                Answers cannot be edited once submitted.
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText sx={{ mb: 1 }}>
                Please answer the following questions honestly. Your responses
                are highly valuable to the BACHELOR OF SCIENCE IN INFORMATION
                TECHNOLOGY department.
              </DialogContentText>
            </DialogContent>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                First Job Details
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <>
                <RdoFirstJobRelatedCourse
                  jobRelatedCourse={jobRelatedCourse}
                  setJobRelatedCourse={setJobRelatedCourse}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <RdoHowLongLandJob
                  howLongLandJob={howLongLandJob}
                  setHowLongLandJob={setHowLongLandJob}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <RdoHowFindJob
                  howFindJob={howFindJob}
                  setHowFindJob={setHowFindJob}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <RdoDifficultiesFirstJob
                  difficultiesFirstJob={difficultiesFirstJob}
                  setDifficultiesFirstJob={setDifficultiesFirstJob}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <RdoStillInFirstJob
                  stillInFirstJob={stillInFirstJob}
                  setStillInFirstJob={setStillInFirstJob}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <RdoHowLongStayJob
                  howLongStayJob={howLongStayJob}
                  setHowLongStayJob={setHowLongStayJob}
                />
                <Divider
                  sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    mt: 2,
                  }}
                />
                <ChkReasonsFirstJob
                  checkedValuesReasons={checkedValuesReasons}
                  setCheckedValuesReasons={setCheckedValuesReasons}
                />
              </>
            </DialogContent>

            <OneTimeEducationDetails
              presentJobCourse={presentJobCourse}
              setPresentJobCourse={setPresentJobCourse}
              competencies={competencies}
              setCompetencies={setCompetencies}
              generalEducationRating={generalEducationRating}
              setGeneralEducationRating={setGeneralEducationRating}
              professionalSubjectRating={professionalSubjectRating}
              setProfessionalSubjectRating={setProfessionalSubjectRating}
              electiveSubjectRating={electiveSubjectRating}
              setElectiveSubjectRating={setElectiveSubjectRating}
              itCertificationRating={itCertificationRating}
              setItCertificationRating={setItCertificationRating}
              seminarRating={seminarRating}
              setSeminarRating={setSeminarRating}
              onTheJobTrainingRating={onTheJobTrainingRating}
              setOnTheJobTrainingRating={setOnTheJobTrainingRating}
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{ justifyContent: "flex-start" }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
        {!formSubmitted && (
          <OverlayText>
            Click here to answer the form and access all the posts
          </OverlayText>
        )}
        <BlurredDiv blur={!formSubmitted}>
          <StyledBox>
            <PostCard refreshPosts={props.refreshPosts} />
          </StyledBox>
        </BlurredDiv>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for submitting the form and helping us!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FeedOneTime;

