import * as React from 'react';
import { Typography, Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useNavigate } from 'react-router-dom';

const steps = ['General Questions', 'Technical Questions', 'Soft Skills'];

const Progress = ({ activeStep, setActiveStep }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const getCompletionPercentage = (step) => {
        const percentageMap = {
            0: '0%',  // Step 1
            1: '30%', // Step 2
            2: '70%', // Step 3 (last step)
        };
        return percentageMap[step];
    };

    return (
        <Box sx={{ width: '100%', mt: '30px' }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ ml: '-130px' }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 3, mb: 1, pl: 10, color: "gray" }}>
                        {getCompletionPercentage(activeStep)} completed
                    </Typography>

                    <Typography sx={{ mt: 10, mb: 1, pl: 7, fontSize: '1.0rem' }}>
                        We’re excited to learn more about you! Please answer the following questions to help us get to know you better.
                        The questions are designed to help us understand your skills and experience better.<br />
                        Your responses will be used
                        to match you with the most suitable role and team
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 7, mt: 7 }}>
                        <TipsAndUpdatesIcon sx={{ fontSize: 65, mr: 2 }} />
                        <Box>
                            <Typography sx={{ fontWeight: 1000, fontSize: '1.4rem' }}>
                                Please note that this is a proctored AI questionnaire.
                            </Typography>
                            <Typography sx={{ color: 'grey', fontSize: '1.0rem' }}>
                                Eg: If you’re applying for software engineer, you’ll be asked to write code as part of the interview process.<br />
                                If you’re applying for digital marketing, you'll likely be asked to create a short social media campaign plan as part of your application
                            </Typography>
                        </Box>
                    </Box>

                </React.Fragment>
            )}
        </Box>
    );
}

export default Progress