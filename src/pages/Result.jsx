import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Result = () => {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); 

    const handleNextClick = () => {
        if (totalPoints < 55) {
            // If the percentage is less than 55%, navigate to the image fail
            navigate('/Application roadmap');
        } else {
            // If the percentage is 55% or higher, navigate to the image success
            navigate('/Application-Roadmap');
        }
    };

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                console.log("Fetching result...");
                const response = await fetch("http://localhost:3001/result", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                let resultObject;
                // Check if `data.message` is a string that needs to be parsed into an object
                if (typeof data.message === 'string') {
                    resultObject = JSON.parse(data.message.replace(/\\n/g, ""));
                } else {
                    resultObject = data.message; // if data.message is already an object
                }

                setResult(resultObject);
                setLoading(false);
                console.log("Parsed result object:", resultObject);
            } catch (error) {
                console.error("Failed to fetch results:", error);
            }
        };

        fetchResult();
    }, []);

    const getProgressColor = (value) => {
        // If the value is 0, always return 'error' to make it red
        if (value === 0) {
            return 'error';
        }
        // Otherwise, use the original condition
        return value < 50 ? 'error' : 'success';
    };

    const totalPoints = result ? parseInt(result["Total Points"].split(" ")[0], 10) : 0;

    const totalPointsText = `${totalPoints}%`;

    return (
        <Box sx={{ margin: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                AI Evaluation Result
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>Loading Results...</Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Typography variant="h6" gutterBottom>
                            The user is <strong>{result.EligibleBool === 'Yes' ? 'ELIGIBLE' : 'NOT ELIGIBLE'}</strong> for the role at Hilti.
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Steps to Enhance Eligibility:
                        </Typography>
                        {/* Map through your steps to enhance eligibility */}
                        {result['Steps to Enhance the users Eligibility for the Position'].map((step, index) => (
                            <Typography key={index}>- {step}</Typography>
                        ))}
                        <Typography sx={{ mt: 2, fontStyle: 'italic' }}>
                            {result["Good Luck Sentence"]}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', maxWidth: '100%' }}>
                                Your Skill Percentile<br />
                                Compared to Each Applicant
                            </Typography>
                            <Box
                                sx={{
                                    position: 'relative', // Changed to relative
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress
                                    variant={totalPoints === 0 ? 'determinate' : 'determinate'}
                                    value={totalPoints === 0 ? 100 : totalPoints}
                                    size={150}
                                    thickness={4}
                                    color={getProgressColor(totalPoints)}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {totalPointsText}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt:5 }}>
                    <button className="ml-4 border border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-full text-base" 
                    onClick={handleNextClick}>
                    Next</button>
                    </Box>
                </Grid>
            )}
        </Box>
    );
};

export default Result;