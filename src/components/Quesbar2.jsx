import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Typography, Box, TextField, CircularProgress } from "@mui/material";

const Quesbar2 = forwardRef((props, ref) => {
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState({
        question6Answer: "",
        question7Answer: "",
        question8Answer: "",
        question9Answer: "",
        question10Answer: "",
    });

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setIsLoading(true);  // Start loading
                console.log("Fetching technical questions..."); // Log when we're making the fetch call
                const response = await fetch(
                    "http://localhost:3001/generateTechnicalQuestion",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Check for HTTP errors
                }
                const data = await response.json();
                setResponse(data.message);
                console.log("Questions fetched:", data.message); // Log the fetched data
                setIsLoading(false);  // Stop loading after the data is received
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestion();
    }, []); // Ensuring this runs only once on component mount

    useImperativeHandle(ref, () => ({
        handleSubmitForm: async () => {
            await handleSubmit();
        }
    }));

    const handleSubmit = async (e) => {
        const submission = {};

        // Loop through the response object to get questions
        Object.entries(response).forEach(([key, value], index) => {
            if (key.startsWith("question")) {
                // Assign the question and corresponding answer to the submission object
                submission[key] = value; // The question text
                submission[`question${index + 6}Answer`] =
                    answers[`question${index + 6}Answer`]; // The user's answer
            }
        });
        console.log(submission);

        // Now submit this structured data to the server
        await fetch("http://localhost:3001/technicalQuestionAnswer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ submission }),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

    return (
        <div>
            <Typography sx={{ mt: 10, mb: 1, pl: 7, fontWeight: "bold", fontSize: "1.6rem" }}>
                Step 2: Technical Questions
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off"
                sx={{ pl: 6, "& .MuiTextField-root": { m: 1, width: "120ch" } }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                        <Typography variant="body1" sx={{ ml: 2 }}>Loading Questions...</Typography>
                    </Box>
                ) : (
                    Object.entries(response).map(([key, value], index) => {
                        if (key.startsWith("question")) {
                            return (
                                <Box key={index} sx={{ mt: 5, pl: 7, pr: 7 }}>
                                    <Typography sx={{ mb: 1, fontWeight: 9000, fontSize: "1.2rem" }}>
                                        {`Question ${index + 6}: ${value}`}
                                    </Typography>
                                    <TextField
                                        id={`outlined-multiline-flexible-${index}`}
                                        name={`${key}Answer`}
                                        multiline
                                        maxRows={4}
                                        value={answers[`${key}Answer`]}
                                        onChange={handleChange}
                                        placeholder="Your answer"
                                    />
                                </Box>
                            );
                        }
                        return null;
                    })
                )}
            </Box>
        </div>
    );
});

export default Quesbar2;
