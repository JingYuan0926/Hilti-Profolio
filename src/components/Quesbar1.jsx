import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Typography, Box, TextField, CircularProgress } from "@mui/material";

const Quesbar1 = forwardRef((props, ref) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState({
    question1Answer: "",
    question2Answer: "",
    question3Answer: "",
    question4Answer: "",
    question5Answer: "",
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true);  // Start loading
        console.log("Fetching questions...");
        const response = await fetch("http://localhost:3001/generateGeneralQuestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResponse(data.message);
        setIsLoading(false);  // Stop loading after the data is received
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestion();
  }, []);

  useImperativeHandle(ref, () => ({
    handleSubmitForm: async () => {
      await handleSubmit();
    }
  }));

  const handleSubmit = async () => {
    const submission = {};
    Object.entries(response).forEach(([key, value], index) => {
      if (key.startsWith("question")) {
        submission[key] = value;
        submission[`question${index + 1}Answer`] = answers[`question${index + 1}Answer`];
      }
    });
    console.log(submission);
    await fetch("http://localhost:3001/generalQuestionAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission }),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  return (
    <div>
      <Typography sx={{ mt: 10, mb: 1, pl: 7, fontWeight: "bold", fontSize: "1.6rem" }}>
        Step 1: General Questions
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
          })
        )}
      </Box>
    </div>
  );
});

export default Quesbar1;
