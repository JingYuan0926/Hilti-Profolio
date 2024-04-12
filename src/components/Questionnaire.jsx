// Questionnaire.js
import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import QuestionStep from './QuestionStep';
import stepsData from './stepsData';

const Questionnaire = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < stepsData.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {stepsData.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <QuestionStep stepData={stepsData[activeStep]} />
      <Box>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>{activeStep === stepsData.length - 1 ? 'Finish' : 'Next'}</Button>
        {activeStep === stepsData.length && (
          <Button onClick={handleReset}>Reset</Button>
        )}
      </Box>
    </Box>
  );
};

export default Questionnaire;
