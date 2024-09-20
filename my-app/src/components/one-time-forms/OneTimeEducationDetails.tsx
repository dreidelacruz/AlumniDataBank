import {
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import RdoPresentJobCourse from "./education-details-components/RdoPresentJobCourse";
import ChkCompentenciesLearn from "./education-details-components/ChkCompentenciesLearn";
import RdoGed from "./education-details-components/RdoGed";
import RdoProSubject from "./education-details-components/RdoProSubject";
import RdoElective from "./education-details-components/RdoElective";
import RdoItCerts from "./education-details-components/RdoItCerts";
import RdoSeminar from "./education-details-components/RdoSeminar";
import RdoOjt from "./education-details-components/RdoOjt";

function OneTimeEducationDetails(props: any) {
  const {
    presentJobCourse,
    setPresentJobCourse,
    competencies,
    setCompetencies,
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
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Education Details
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <RdoPresentJobCourse
          presentJobCourse={presentJobCourse}
          setPresentJobCourse={setPresentJobCourse}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <ChkCompentenciesLearn
          competencies={competencies}
          setCompetencies={setCompetencies}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoGed
          generalEducationRating={generalEducationRating}
          setGeneralEducationRating={setGeneralEducationRating}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoProSubject
          professionalSubjectRating={professionalSubjectRating}
          setProfessionalSubjectRating={setProfessionalSubjectRating}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoElective
          electiveSubjectRating={electiveSubjectRating}
          setElectiveSubjectRating={setElectiveSubjectRating}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoItCerts
          itCertificationRating={itCertificationRating}
          setItCertificationRating={setItCertificationRating}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoSeminar
          seminarRating={seminarRating}
          setSeminarRating={setSeminarRating}
        />
        <Divider
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            mt: 2,
          }}
        />
        <RdoOjt
          onTheJobTrainingRating={onTheJobTrainingRating}
          setOnTheJobTrainingRating={setOnTheJobTrainingRating}
        />
      </DialogContent>
    </>
  );
}

export default OneTimeEducationDetails;
