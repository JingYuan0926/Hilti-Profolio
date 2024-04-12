import React from 'react';
import { Typography, TextField, Box } from '@mui/material';

const QuestionStep = ({ stepNumber, questions }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Step {stepNumber}: {questions.title}
      </Typography>
      {questions.items.map((question, index) => (
        <Box key={index}>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Question {index + 1}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {question.prompt}
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default QuestionStep;
