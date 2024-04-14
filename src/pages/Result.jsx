import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, List, ListItem } from '@mui/material';

const Result = () => {
    const [result, setResult] = useState(null); // Store the entire result object as an object

    useEffect(() => {
        const fetchResult = async () => {
            try {
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
                setResult(data); // Assuming data.message contains the JSON result
                console.log("Result fetched:", data.message);
            } catch (error) {
                console.error("Failed to fetch results:", error);
            }
        };

        fetchResult();
    }, []);

    return (
        <Box sx={{ margin: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                AI Evaluation Result
            </Typography>

            {result ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        The user is <strong>{result.Eligible}</strong> for the role.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Steps to Enhance the User's Eligibility for the Position:
                        {result["Steps to Enhance the users Eligibility for the Position"] ? (
                            <List>
                                {result["Steps to Enhance the users Eligibility for the Position"].map((step, index) => (
                                    <ListItem key={index}>{step}</ListItem>
                                ))}
                            </List>
                        ) : <p>No steps available.</p>}
                    </Typography>
                    <Typography>
                        Points Distribution:
                        <Box sx={{ fontFamily: 'monospace' }}>
                            {result.Points ? Object.entries(result.Points).map(([key, value], index) => (
                                <Typography key={index}>{key}: {value}</Typography>
                            )) : <p>No points data available.</p>}
                        </Box>
                        Total Points: {result["Total Points"] ?? "Not available"}
                    </Typography>
                    <Typography sx={{ mt: 2, fontStyle: 'italic' }}>
                        {result["Good Luck Sentence"]}
                    </Typography>
                </>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>Loading results...</Typography>
                </Box>
            )}
        </Box>
    );
};

export default Result;