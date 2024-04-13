import React, { useState, useEffect } from "react";
import { Typography, Box, TextField } from "@mui/material";

const Quesbar3 = (activeStep) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    question11Answer: "",
    question12Answer: "",
    question13Answer: "",
    question14Answer: "",
    question15Answer: "",
  });

  const fetchQuestion = async () => {
    const res = await fetch(
      "http://localhost:3001/generateSoftSkillsQuestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        console.log("Fetching questions..."); // Log when we're making the fetch call
        const response = await fetch(
          "http://localhost:3001/generateSoftSkillsQuestion",
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
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestion();
  }, []); // Ensuring this runs only once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = {};

    // Loop through the response object to get questions
    Object.entries(response).forEach(([key, value], index) => {
      if (key.startsWith("question")) {
        // Assign the question and corresponding answer to the submission object
        submission[key] = value; // The question text
        submission[`question${index + 11}Answer`] =
          answers[`question${index + 11}Answer`]; // The user's answer
      }
    });
    console.log(submission);

    // Now submit this structured data to the server
    await fetch("http://localhost:3001/softSkillsQuestionAnswer", {
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
      <Typography
        sx={{ mt: 10, mb: 1, pl: 7, fontWeight: "bold", fontSize: "1.6rem" }}
      >
        Step 3: Soft Skills Questions
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          pl: 6,
          "& .MuiTextField-root": { m: 1, width: "120ch" },
        }}
      >
        {Object.entries(response).map(([key, value], index) => {
          if (key.startsWith("question")) {
            return (
              <Box key={index} sx={{ mt: 5, pl: 7, pr: 7 }}>
                <Typography
                  sx={{ mb: 1, fontWeight: 9000, fontSize: "1.2rem" }}
                >
                  {`Question ${index + 11}: ${value}`}
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

export default Quesbar3;
