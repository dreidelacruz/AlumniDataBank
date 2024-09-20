import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Sc",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function RateEducationalCompe(props: any) {
    const {
        generalEducationRating,
        setGeneralEducationRating,
        professionalSubjectRating,
        setProfessionalSubjectRating,
        electiveSubjectRating,
        setElectiveSubjectRating,
        itCertificationRating,
        setItCertificationRating,
        seminarRating,
        setSeminarRating,
        onTheJobTrainingRating,
        setOnTheJobTrainingRating,
      } = props;

  return (
    <>
      <Box sx={{ mb: 1, mt: 1 }}>
        <Typography>Rate of following Educational Compentencies</Typography>
      </Box>
      <Typography component="legend">General Education Subject</Typography>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
        value={generalEducationRating}
        onChange={(event, newValue) => {
          setGeneralEducationRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
      <Typography component="legend">Professional Subject</Typography>
      <StyledRating
        defaultValue={2}
        name="highlight-selected-only"
        value={professionalSubjectRating}
        onChange={(event, newValue) => {
          setProfessionalSubjectRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
      <Typography component="legend">
        Elective and free elective subject
      </Typography>
      <StyledRating
        defaultValue={2}
        name="highlight-selected-only"
        value={electiveSubjectRating}
        onChange={(event, newValue) => {
          setElectiveSubjectRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />

      <Typography component="legend">IT certification</Typography>
      <StyledRating
        defaultValue={2}
        name="highlight-selected-only"
        value={itCertificationRating}
        onChange={(event, newValue) => {
          setItCertificationRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />

      <Typography component="legend">Seminar, Conference, Training</Typography>
      <StyledRating
        defaultValue={2}
        name="highlight-selected-only"
        value={seminarRating}
        onChange={(event, newValue) => {
          setSeminarRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />

      <Typography component="legend">On the Job Training</Typography>
      <StyledRating
        defaultValue={2}
        name="highlight-selected-only"
        value={onTheJobTrainingRating}
        onChange={(event, newValue) => {
          setOnTheJobTrainingRating(newValue as number);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
    </>
  );
}

export default RateEducationalCompe;

