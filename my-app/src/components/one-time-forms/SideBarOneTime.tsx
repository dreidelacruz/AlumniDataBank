import React, { useEffect, useState } from "react";
import SideBar from "../alumni/home-components/SideBar";
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
  Fab,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import RdoCompanyType from "./employment-details-components/RdoCompanyType";
import RdoJobPosition from "./employment-details-components/RdoJobPosition";
import RdoEmploymentBoolean from "./employment-details-components/RdoEmploymentBoolean";
import RdoEmploymentStatus from "./employment-details-components/RdoEmploymentStatus";
import RdoUnemploymentBoolean from "./employment-details-components/unemployment-details-compo/RdoUnemploymentBoolean";
import ChkReasonsForUnemploy from "./employment-details-components/unemployment-details-compo/ChkReasonsForUnemploy";
import axios from "axios";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";

const StyledSidebar = ({ open, ...props }: any) => (
  <Box
    sx={{
      position: "fixed",
      top: `calc(64px + 20px)`,
      left: 0,
      bottom: 0,
      width: "auto",
      height: "auto",
      display: "inline",
      backgroundColor: "#FECD07",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.3s ease",
      transform: open ? "translateX(0)" : "translateX(-100%)",
      zIndex: 9999,
      "@media (max-width: 600px)": {
        top: "calc(656px + 20px)", // Adjust the top property for mobile screens
        left: open ? "translateX(0)" : "translateX(-100%)", // Slide from left if open, otherwise hide
        width: "fit-content",
        height: "auto",
        transform: open ? "translateX(0)" : "translateX(-100%)",
      },
      "@media (max-width: 1024px)": {
        top: "calc(56px + 20px)", // Adjust the top property for iPad screens
        width: "fit-content", // Adjust the width for iPads
      },
    }}
    {...props}
  />
);

const OverlayText = styled("div")({
  position: "static",
  zIndex: 1,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "1rem",
  borderRadius: "0.5rem",
  top: "30%",
});

const reasonEndpoints: any = {
  pursingAdvanceStudies: "pursuing-advance-studies",
  familyConcern: "familyconcern",
  healthReason: "health-reason",
  lackOfExp: "lack-of-exp",
  lackOfInterest: "lack-of-interest",
  inadeqSkill: "inadeq-skill",
  noJobOpport: "no-job-opportunity",
  didNotLookForJob: "did-not-look-for-job",
  unsatisfactoryOffer: "unsatisfactoryOffer",
  other: "Other",
};

function SideBarOneTime() {
  const [open, setOpen] = useState(false);
  const [yearDatas, setYearDatas] = useState<any[]>([]);

  const [employmentBoolean, setEmploymentBoolean] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [unemploymentBoolean, setUnemploymentBoolean] = useState("");
  const [reasonsForUnemploy, setReasonsForUnemploy] = useState<string[]>([]);

  const storedAlumni = localStorage.getItem("alumni");
  const alumni = storedAlumni ? JSON.parse(storedAlumni) : null;
  const year = alumni?.year;

  const userId = alumni?.id;
  const formSubmittedFlag = `formSubmitted1-${userId}`;
  const storedFormSubmitted = localStorage.getItem(formSubmittedFlag);
  const [formSubmitted, setFormSubmitted] = useState(
    storedFormSubmitted === "true"
  );
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSidebarClick = () => {
    if (!formSubmitted) {
      setOpen(true);
    }
  };

  const handleClose = (e: any) => {
    console.log("Dialog box closed");
    e.stopPropagation();
    setOpen(false);
    setEmploymentBoolean("");
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

  const presentlyEmployedIdArr = yearDatas
    .filter((yearData) => yearData.graduatedSchoolYear === year)
    .map((yearData) => yearData.employee.presentlyEmployed.id);

  const presentlyEmployedId = presentlyEmployedIdArr[0];

  const updateReasonsForUnemployment = async (reasonsForUnemploy: string[]) => {
    const reasonForUnemployedIdArr = yearDatas
      .filter((yearData) => yearData.graduatedSchoolYear === year)
      .map((yearData) => yearData.employee.reasonForUnemployed.id);

    const reasonForUnemployedId = reasonForUnemployedIdArr[0];

    for (const reason of reasonsForUnemploy) {
      const endpoint = reasonEndpoints[reason];
      if (endpoint) {
        try {
          await axios.put(
            `https://localhost:5001/api/EmploymentDetails/reason-for-unemployed/${endpoint}/${reasonForUnemployedId}`,
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

  const convertCompanyTypeToUrlFormat = (companyType: any) => {
    const conversionMap: any = {
      bpoIndustry: "bpo-industry",
      educationalInstitution: "educational-institution",
      multinationalCompany: "multination-company",
      bankingInstitution: "banking-institution",
      govermentOffices: "goverment-offices",
      privateInstitution: "private-institution",
      itIndustry: "itindustry",
      insurances: "insurance",
      communicationCompany: "communication-company",
      other: "other",
    };
    return conversionMap[companyType];
  };

  const convertJobPositionToUrlFormat = (jobPosition: any) => {
    const conversionMap: any = {
      managerial: "managerial",
      supervisory: "supervisory",
      clerical: "clerical",
      selfEmployed: "self-employed",
      other: "other",
    };
    return conversionMap[jobPosition];
  };

  const convertEmploymentStatusToUrlFormat = (employmentStatus: any) => {
    const conversionMap: any = {
      regular: "regular",
      temporary: "temporary",
      casual: "casual",
      contractual: "contractual",
      partTime: "partime",
      probitionary: "probationary",
    };
    return conversionMap[employmentStatus];
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      axios.put(
        `https://localhost:5001/api/EmploymentDetails/presently-employed/${employmentBoolean}/${presentlyEmployedId}`,
        {
          // Add your data payload here, for example:
          yes: employmentBoolean === "yes" ? 1 : 0,
          no: employmentBoolean === "no" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (employmentBoolean === "no") {
        const checkboxes = e.currentTarget.querySelectorAll(
          'input[type="checkbox"]'
        );
        const isAllUnchecked = Array.from(checkboxes).every(
          (checkbox) => !(checkbox as HTMLInputElement).checked
        );

        if (isAllUnchecked) {
          alert("Please select at least one checkbox");
          return;
        }
        // console log the value of each checked checkbox
        checkboxes.forEach((checkbox: any) => {
          if ((checkbox as HTMLInputElement).checked) {
            console.log(checkbox.value);
          }
        });

        const employedAfterGradIdArr = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.employee.employedAfterGraduation.id);

        const employedAfterGradId = employedAfterGradIdArr[0];

        axios.put(
          `https://localhost:5001/api/EmploymentDetails/employed-after-grad/${unemploymentBoolean}/${employedAfterGradId}`,
          {
            yes: unemploymentBoolean === "yes" ? 1 : 0,
            no: unemploymentBoolean === "no" ? 1 : 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        await updateReasonsForUnemployment(reasonsForUnemploy);
      } else if (employmentBoolean === "yes") {
        const companyTypeIdArr = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.employee.companyType.id);

        const companyTypeId = companyTypeIdArr[0];
        const urlFormattedCompanyType =
          convertCompanyTypeToUrlFormat(companyType);

        axios.put(
          `https://localhost:5001/api/EmploymentDetails/company-type/${urlFormattedCompanyType}/${companyTypeId}`,
          {
            companyType: companyType,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jobPositionIdArr = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.employee.jobPosition.id);

        const jobPositionId = jobPositionIdArr[0];
        const urlFormattedJobPosition =
          convertJobPositionToUrlFormat(jobPosition);

        axios.put(
          `https://localhost:5001/api/EmploymentDetails/jobposition/${urlFormattedJobPosition}/${jobPositionId}`,
          {
            jobPosition: jobPosition,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const employmentStatusIdArr = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.employee.employmentStatus.id);

        const employmentStatusId = employmentStatusIdArr[0];
        const urlFormattedEmploymentStatus =
          convertEmploymentStatusToUrlFormat(employmentStatus);

        axios.put(
          `https://localhost:5001/api/EmploymentDetails/employmentstatus/${urlFormattedEmploymentStatus}/${employmentStatusId}`,
          {
            employmentStatus: employmentStatus,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      setShowSnackbar(true);
      localStorage.setItem(formSubmittedFlag, "true");
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
    setFormSubmitted(true);
  };

  return (
    <>
      <StyledSidebar open={isSidebarOpen}>
        <Box onClick={handleSidebarClick}>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleFormSubmit}>
              <DialogTitle>
                <Typography variant="h4" fontWeight="bold">
                  Employment Details
                </Typography>
                <Typography color="error">
                  Please review your answers carefully as this is a one-time
                  form submission.
                  <br />
                  Answers cannot be edited once submitted.
                </Typography>
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText sx={{ mb: 5 }}>
                  Please answer the following questions honestly. Your responses
                  are highly valuable to the BACHELOR OF SCIENCE IN INFORMATION
                  TECHNOLOGY department.
                </DialogContentText>
                <Box>
                  <Divider
                    sx={{
                      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  />
                  <RdoEmploymentBoolean
                    employmentBoolean={employmentBoolean}
                    setEmploymentBoolean={setEmploymentBoolean}
                  />
                  <Divider
                    sx={{
                      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                      mt: 2,
                    }}
                  />
                  {employmentBoolean === "yes" && (
                    <Box>
                      <RdoCompanyType
                        companyType={companyType}
                        setCompanyType={setCompanyType}
                      />
                      <Divider
                        sx={{
                          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                          mt: 2,
                        }}
                      />
                      <RdoJobPosition
                        jobPosition={jobPosition}
                        setJobPosition={setJobPosition}
                      />
                      <Divider
                        sx={{
                          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                          mt: 2,
                        }}
                      />
                      <RdoEmploymentStatus
                        employmentStatus={employmentStatus}
                        setEmploymentStatus={setEmploymentStatus}
                      />
                    </Box>
                  )}
                  {employmentBoolean === "no" && (
                    <Box>
                      <RdoUnemploymentBoolean
                        unemploymentBoolean={unemploymentBoolean}
                        setUnemploymentBoolean={setUnemploymentBoolean}
                      />
                      <Divider
                        sx={{
                          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                          mt: 2,
                        }}
                      />
                      <ChkReasonsForUnemploy
                        reasonsForUnemploy={reasonsForUnemploy}
                        setReasonsForUnemploy={setReasonsForUnemploy}
                      />
                    </Box>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>
          {!formSubmitted && (
            <OverlayText>
              Click here to answer the form and access all the alumnus
            </OverlayText>
          )}
          <SideBar formSubmitted={formSubmitted} />
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
        </Box>
      </StyledSidebar>
      <Fab
        sx={{
          position: "fixed",
          bottom: { xs: "55px", sm: "90px", md: "90px" },
          right: { xs: "20px", sm: "30px", md: "40px" },
          width: { xs: "auto", sm: "110px", md: "120px" },
          height: { xs: "auto", sm: "60px", md: "70px" },
          padding: "6px 6px",
          transform: "translateY(-50%)",
          zIndex: 9999,
        }}
        color="info"
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        variant="extended"
      >
        <Typography
          fontWeight={500}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {isSidebarOpen ? (
            <CloseIcon sx={{ marginRight: "1px" }} />
          ) : (
            <GroupIcon sx={{ marginRight: "1px" }} />
          )}
          {isSidebarOpen ? "Close" : "View Alumni"}
        </Typography>
      </Fab>
    </>
  );
}

export default SideBarOneTime;

