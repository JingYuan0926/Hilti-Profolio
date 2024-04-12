import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import { Progress, Quesbar1, Quesbar2, Quesbar3 } from '../components'; // Import the necessary Quesbar components
import { useNavigate } from 'react-router-dom';

const Steps = ['General Questions', 'Technical Questions', 'Soft Skills'];

const Ques = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate(); // This line declares the navigate function using useNavigate()

  const handleNext = () => {
    if (activeStep < Steps.length - 1) {
      // Move to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Navigate to another page
      navigate('/Result'); // Update this path to your desired route
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
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
      {/* Conditionally render the appropriate Quesbar component based on the activeStep */}
      {activeStep === 0 && <Quesbar1 />}
      {activeStep === 1 && <Quesbar2 />}
      {activeStep === 2 && <Quesbar3 />}

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
            onClick={handleBack}
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
};

export default Ques
