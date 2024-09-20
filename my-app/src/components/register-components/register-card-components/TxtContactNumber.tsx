import { Box, Typography } from "@mui/material";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function TxtContactNumber(props: any) {
  const { mobileNumber, setMobileNumber } = props;

  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography sx={{ mb: 1 }}>Contact Number</Typography>
      <PhoneInput
        country={'ph'} // Set default country, or remove this line to show a country dropdown
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        placeholder="Enter phone number"
        inputStyle={{ width: '85%' }}
        inputProps={{ required: true }}
      />
    </Box>
  );
}

export default TxtContactNumber;
