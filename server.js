import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

let currentRole = "";

app.post("/role", async (req, res) => {
  // Extract the role from the request body
  const { role } = req.body;
  console.log(role);
  // Store the role in the server variable
  currentRole = role;
});

// Define an array to store answers
let allAnswers = [];

app.post("/generateGeneralQuestion", async (req, res) => {
  const generalQuestion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a strict interviewer in Hilti. There are 3 phases first is general question, second is hard skill, third is soft skill. Now is first phase, ask 5 general question for example who am i, why this company(Hilti), expected salary and many other question that is general and will be asked during the interview. The role the user choose is ${currentRole} you may or may not ask a bit alligned to its role and give the question in JSON format 
            for example question1:"",question2:"",question3:"",question4:"",question5:"" Short question should be enough`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    response_format: { type: "json_object" },
    temperature: 1.0,
  });

  const messageContent = JSON.parse(generalQuestion.choices[0].message.content);

  console.log(messageContent);

  if (messageContent) {
    res.json({
      message: messageContent,
    });
  }
});

app.post("/generalQuestionAnswer", async (req, res) => {
  const generalQuestionAnswer = req.body.submission;
  const generalQuestionAnswerText = Object.entries(generalQuestionAnswer)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  console.log(generalQuestionAnswerText);

  // Check if the question-answer pair already exists in the array
  if (!allAnswers.includes(generalQuestionAnswerText)) {
    // If it doesn't exist, push it into the array
    allAnswers.push(generalQuestionAnswerText);
    console.log(allAnswers);
  }

  res.sendStatus(200); // Respond with success status

  // const acceptAnswer = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content: `Now analyse on the question and answer i given you tell me if the user is eligible for the job of ${currentRole}, empty answer means they dont know how to answer so eliminate and not suitable.`,
  //     },
  //     {
  //       role: "user",
  //       content: generalQuestionAnswerText,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo",
  //   max_tokens: 1000,
  //   temperature: 1.0,
  // });
  // console.log(acceptAnswer.choices[0].message.content);
});

app.post("/generateTechnicalQuestion", async (req, res) => {
  const technicalQuestion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a strict interviewer in Hilti. There are 3 phases first is general question, second is hard skill/technical questions, third is soft skill related questions. 
        Now is second phase, ask 5 technical or hard skills related question from frontend development to backend development and also include databases that will be asked during the job interview. 
        The role the user choose is ${currentRole} you may or may not ask a bit alligned to its role and give the question in JSON format. The questions start from question6
        For example question6:"",question7:"",question8:"",question9:"",question10:"" Short question should be enough`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    response_format: { type: "json_object" },
    temperature: 1.0,
  });

  const messageContent = JSON.parse(
    technicalQuestion.choices[0].message.content
  );

  console.log(messageContent);

  if (messageContent) {
    res.json({
      message: messageContent,
    });
  }
});

app.post("/technicalQuestionAnswer", async (req, res) => {
  const technicalQuestionAnswer = req.body.submission;
  const technicalQuestionAnswerText = Object.entries(technicalQuestionAnswer)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  console.log(technicalQuestionAnswerText);

  // Check if the question-answer pair already exists in the array
  if (!allAnswers.includes(technicalQuestionAnswerText)) {
    // If it doesn't exist, push it into the array
    allAnswers.push(technicalQuestionAnswerText);
    console.log(allAnswers);
  }

  res.sendStatus(200); // Respond with success status
});

app.post("/generateSoftSkillsQuestion", async (req, res) => {
  const softSkillsQuestion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a strict interviewer in Hilti. There are 3 phases first is general question, second is hard skill/technical questions, third is soft skill related questions. 
        Now is third phase, ask 5 soft skills related question that will normally be asked during the job interview. 
        The role the user choose is ${currentRole} you may or may not ask a bit alligned to its role and give the question in JSON format. 
        The questions start from question11. For example question11:"",question12:"",question13:"",question14:"",question15:"" Short question should be enough`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    response_format: { type: "json_object" },
    temperature: 1.0,
  });

  const messageContent = JSON.parse(
    softSkillsQuestion.choices[0].message.content
  );

  console.log(messageContent);

  if (messageContent) {
    res.json({
      message: messageContent,
    });
  }
});

app.post("/softSkillsQuestionAnswer", async (req, res) => {
  const softSkillsQuestionAnswer = req.body.submission;
  const softSkillsQuestionAnswerText = Object.entries(softSkillsQuestionAnswer)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  console.log(softSkillsQuestionAnswerText);

  // Check if the question-answer pair already exists in the array
  if (!allAnswers.includes(softSkillsQuestionAnswerText)) {
    // If it doesn't exist, push it into the array
    allAnswers.push(softSkillsQuestionAnswerText);
    console.log(allAnswers);
  }

  // Analyze all the answers stored in the array
  const combinedAnswers = allAnswers.join("\n\n");
  const acceptAnswer = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Now analyze the answers for all the questions. Determine if the user is eligible for the job of ${currentRole}. An empty answer indicates the user does not know how to respond, and they are not suitable.`,
      },
      {
        role: "user",
        content: combinedAnswers,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    temperature: 1.0,
  });

  // Log the analysis result
  console.log("Answer analysis:", acceptAnswer.choices[0].message.content);

  // Clear the allAnswers array for the next set of answers
  allAnswers = [];

  // Respond with the combined analysis
  res.json(acceptAnswer.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
