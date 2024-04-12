import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
const port = 3001;

const role = "software engineer";

app.use(bodyParser.json());
app.use(cors());

app.post('/generateGeneralQuestion', async (req, res) => {
    
    const generalQuestion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: `You are a strict interviewer in Hilti. There are 3 phases first is general question, second is hard skill, third is soft skill. Now is first phase, ask 5 general question for example who am i, why this company(Hilti), expected salary and many other question that is general and will be asked during the interview. The role the user choose is ${role} you may or may not ask a bit alligned to its role and give the question in JSON format 
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
    const acceptAnswer = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: `Now analyse on the question and answer i given you tell me if the user is eligible for the job, empty answer means they dont know how to answer.`
            },
            {
                role: "user", content: generalQuestionAnswerText,
            }

        ],
        model: "gpt-3.5-turbo-1106",
        max_tokens: 1000,
        temperature: 1.0,
    });
    console.log(generalQuestionAnswerText.choices[0].message.content);

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

