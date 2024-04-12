import React from 'react';
import { Typography, TextField, Box } from '@mui/material';

const stepsData = [
  {
    title: 'General Questions',
    items: [
      {
        prompt: 'Question 1',
        render: () => (
          <React.Fragment>
            {/* The question */}
            <Typography>{'(*the question)'}</Typography>
            {/* The form */}
            <Box
              component="form"
              sx={{
                pl: 6,
                '& .MuiTextField-root': { m: 1, width: '150ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                />
              </div>
            </Box>
          </React.Fragment>
        ),
      },
      // Repeat the same structure for other questions
    ],
  },
  {
    title: 'Technical Questions',
    items: [
      {
        prompt: 'Question 1',
        render: () => (
          <React.Fragment>
            {/* The question */}
            <Typography>{'(*the question)'}</Typography>
            {/* The form */}
            <Box
              component="form"
              sx={{
                pl: 6,
                '& .MuiTextField-root': { m: 1, width: '150ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                />
              </div>
            </Box>
          </React.Fragment>
        ),
      },
      // Repeat the same structure for other questions
    ],
  },
  {
    title: 'Soft Skills',
    items: [
      {
        prompt: 'Question 1',
        render: () => (
          <React.Fragment>
            {/* The question */}
            <Typography>{'(*the question)'}</Typography>
            {/* The form */}
            <Box
              component="form"
              sx={{
                pl: 6,
                '& .MuiTextField-root': { m: 1, width: '150ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                />
              </div>
            </Box>
          </React.Fragment>
        ),
      },
      // Repeat the same structure for other questions
    ],
  },
];

export default stepsData;

/*
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
*/