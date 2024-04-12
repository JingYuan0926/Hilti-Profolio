import React, { useState, useEffect } from 'react'
import { Typography, Box, TextField } from '@mui/material';

const Quesbar1 = (activeStep) => {
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState({
        question1Answer: '',
        question2Answer: '',
        question3Answer: '',
        question4Answer: '',
        question5Answer: '',
    });

    useEffect(() => {
        // This function will fetch the question immediately when the component mounts.
        const fetchQuestion = async () => {
            const res = await fetch('http://localhost:3001/generateGeneralQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => setResponse(data.message));
        };

        fetchQuestion();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const submission = {};

        // Loop through the response object to get questions
        Object.entries(response).forEach(([key, value], index) => {
            if (key.startsWith('question')) {
                // Assign the question and corresponding answer to the submission object
                submission[key] = value; // The question text
                submission[`question${index + 1}Answer`] = answers[`question${index + 1}Answer`]; // The user's answer
            }
        });
        console.log(submission);

        // Now submit this structured data to the server
        fetch('http://localhost:3001/generalQuestionAnswer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ submission }),
        })
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
            <Typography sx={{ mt: 10, mb: 1, pl: 7, fontWeight: 9000, fontSize: '2.1rem' }}>
                Step 1: General Questions
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{
                pl: 6,
                '& .MuiTextField-root': { m: 1, width: '150ch' },
            }}>
                {Object.entries(response).map(([key, value], index) => {
                    if (key.startsWith('question')) {
                        return (
                            <Box key={index} sx={{ mt: 5, pl: 7 }}>
                                <Typography sx={{ mb: 1, fontWeight: 9000, fontSize: '1.7rem' }}>
                                    {`Question ${index + 1}: ${value}`}
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
                })}
                <Box sx={{ pl: 7, mt: 2 }}>
                    <button type="submit">Submit All Answers</button>
                </Box>
            </Box>
        </div>
    );
};

export default Quesbar1
