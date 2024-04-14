import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Progress, Quesbar1, Quesbar2, Quesbar3 } from '../components'; // Import the necessary Quesbar components
import { useNavigate } from 'react-router-dom';

const Steps = ['General Questions', 'Technical Questions', 'Soft Skills'];

const Ques = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate(); // This line declares the navigate function using useNavigate()
  const quesbarRefs = [useRef(), useRef(), useRef()];

  const handleNext = async () => {
    if (activeStep < Steps.length - 1) {
      const currentForm = quesbarRefs[activeStep].current;
      if (currentForm && currentForm.handleSubmitForm) {
        await currentForm.handleSubmitForm(); // Make sure submission is awaited
      }
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Handle the final step submission before navigating
      const currentForm = quesbarRefs[activeStep].current;
      if (currentForm && currentForm.handleSubmitForm) {
        await currentForm.handleSubmitForm();
      }
      navigate('/Result');
    }
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
      {activeStep === 0 && <Quesbar1 ref={quesbarRefs[0]} />}
      {activeStep === 1 && <Quesbar2 ref={quesbarRefs[1]} />}
      {activeStep === 2 && <Quesbar3 ref={quesbarRefs[2]} />}

      {activeStep === Steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

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
