import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText, Stack } from "@mui/material";


function ChkReasonsForUnemploy(props: any) {
  const {reasonsForUnemploy, setReasonsForUnemploy} = props

  const handleChkReasonsForUnemploy = (e: any) => {
    const { value } = e.target;
    const currentIndex = reasonsForUnemploy.indexOf(value);
    const newChecked = [...reasonsForUnemploy];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setReasonsForUnemploy(newChecked);
  };

  const isAtLeastOneOptionSelected = reasonsForUnemploy.length > 0;

  return (
    <div>
      <FormControl component="fieldset" required>
        <FormLabel component="legend">
          Please state your reasons <br /> for unemployment
        </FormLabel>
        <FormGroup aria-label="reason-unemploy" row>
          <Stack direction="column">
            <FormControlLabel
              control={
                <Checkbox
                  value="pursingAdvanceStudies"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("pursingAdvanceStudies") !== -1
                  }
                />
              }
              label="Pursuing advance studies"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="familyConcern"
                  onChange={handleChkReasonsForUnemploy}
                  checked={reasonsForUnemploy.indexOf("familyConcern") !== -1}
                />
              }
              label="Family concern"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="healthReason"
                  onChange={handleChkReasonsForUnemploy}
                  checked={reasonsForUnemploy.indexOf("healthReason") !== -1}
                />
              }
              label="Health reasons"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="lackOfExp"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("lackOfExp") !== -1
                  }
                />
              }
              label="Lack of experience"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="lackOfInterest"
                  onChange={handleChkReasonsForUnemploy}
                  checked={reasonsForUnemploy.indexOf("lackOfInterest") !== -1}
                />
              }
              label="Lack of Interest"
              labelPlacement="end"
            />
          </Stack>

          <Stack direction="column">
            <FormControlLabel
              control={
                <Checkbox
                  value="inadeqSkill"
                  onChange={handleChkReasonsForUnemploy}
                  checked={reasonsForUnemploy.indexOf("inadeqSkill") !== -1}
                />
              }
              label="Inadequate skill"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="noJobOpport"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("noJobOpport") !== -1
                  }
                />
              }
              label="No job opportunities"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="didNotLookForJob"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("didNotLookForJob") !== -1
                  }
                />
              }
              label="Did not look for a job"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="unsatisfactoryOffer"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("unsatisfactoryOffer") !== -1
                  }
                />
              }
              label="Unsatisfactory offer"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="other"
                  onChange={handleChkReasonsForUnemploy}
                  checked={
                    reasonsForUnemploy.indexOf("other") !== -1
                  }
                />
              }
              label="Others"
              labelPlacement="end"
            />
          </Stack>
        </FormGroup>
        {!isAtLeastOneOptionSelected && (
          <FormHelperText>Please select at least one option.</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default ChkReasonsForUnemploy;


  // useEffect(() => {
  //   console.log(reasonsForUnemploy);
  // }, [reasonsForUnemploy]);