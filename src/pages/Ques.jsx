import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Progress, Quesbar, Steps } from '../components';
import { useNavigate } from 'react-router-dom';

const Ques = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate(); // This line declares the navigate function using useNavigate()

  const handleNext = () => {
    if (activeStep < Steps.length - 1) {
      // Move to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Navigate to another page
      navigate('/Result'); // Update this path to your desired route
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ overflowX: 'hidden', }}>
      <Typography
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'serif',
          fontWeight: 1000,
          fontSize: '2.7rem',
          letterSpacing: '.03rem',
          color: 'black',
          textDecoration: 'none',
          mt: '30px',
          ml: '50px',
        }}
      >
        Questionnaire
      </Typography>
      <Progress activeStep={activeStep} setActiveStep={setActiveStep} />
      <Quesbar activeStep={activeStep} />

      {activeStep === Steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext}>
            {activeStep === Steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Ques;