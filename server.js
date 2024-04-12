import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

let currentRole = '';

app.post('/role', async (req, res) => {
    // Extract the role from the request body
    const { role } = req.body;
    console.log(role);
    // Store the role in the server variable
    currentRole = role;

    // Respond to the client that the role was successfully set
});



app.post('/generateGeneralQuestion', async (req, res) => {
   
    const generalQuestion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: `You are a strict interviewer in Hilti. There are 3 phases first is general question, second is hard skill, third is soft skill. Now is first phase, ask 5 general question for example who am i, why this company(Hilti), expected salary and many other question that is general and will be asked during the interview. The role the user choose is ${currentRole} you may or may not ask a bit alligned to its role and give the question in JSON format 
            for example question1:"",question2:"",question3:"",question4:"",question5:"" Short question should be enough`
            },
        ],
        model: "gpt-3.5-turbo-1106",
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

app.post('/generalQuestionAnswer', async (req, res) => {
    const generalQuestionAnswer = req.body.submission;
    const generalQuestionAnswerText = Object.entries(generalQuestionAnswer).map(([key, value]) => `${key}: ${value}`).join('\n');
    console.log(generalQuestionAnswerText);
    const acceptAnswer = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: `Now analyse on the question and answer i given you tell me if the user is eligible for the job of ${currentRole}, empty answer means they dont know how to answer so eliminate and not suitable.`
            },
            {
                role: "user", content: generalQuestionAnswerText,
            }

        ],
        model: "gpt-3.5-turbo-1106",
        max_tokens: 1000,
        temperature: 1.0,
    });
    console.log(acceptAnswer.choices[0].message.content);

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

