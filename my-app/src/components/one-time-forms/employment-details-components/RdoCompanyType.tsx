import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoCompanyType(props: any) {
  const {companyType, setCompanyType} = props

  const handleRdoCompanyType = (e: any) => {
    setCompanyType(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="present-employ">Company Type</FormLabel>
        <RadioGroup
          row
          name={props.name}
          value={companyType}
          onChange={handleRdoCompanyType}
          defaultValue=""
        >
          <Stack direction="column">
            <FormControlLabel
              value="bpoIndustry"
              control={<Radio required />}
              label="BPO Industry"
            />
            <FormControlLabel
              value="educationalInstitution"
              control={<Radio required />}
              label="Educatinal Institution"
            />
            <FormControlLabel
              value="multinationalCompany"
              control={<Radio required />}
              label="Multinational Companies"
            />
            <FormControlLabel
              value="bankingInstitution"
              control={<Radio required />}
              label="Banking Institution"
            />
            <FormControlLabel
              value="govermentOffices"
              control={<Radio required />}
              label="Government Offices"
            />
          </Stack>
          <Stack direction="column">
            <FormControlLabel
              value="privateInstitution"
              control={<Radio required />}
              label="Private Institution"
            />
            <FormControlLabel
              value="itIndustry"
              control={<Radio required />}
              label="IT Industry"
            />
            <FormControlLabel
              value="insurances"
              control={<Radio required />}
              label="Insurances"
            />
            <FormControlLabel
              value="communicationCompany"
              control={<Radio required />}
              label="Communication Company"
            />
            <FormControlLabel
              value="other"
              control={<Radio required />}
              label="Others"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoCompanyType;
