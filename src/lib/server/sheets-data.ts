import { google } from 'googleapis';
import { SHEET_ID, GOOG_CREDENTIALS } from '$env/static/private';
import type { Question, Quiz, QuizInfo } from '$lib/types';

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = SHEET_ID;
const keys = JSON.parse(GOOG_CREDENTIALS);
const client = google.auth.fromJSON(keys);
// @ts-ignore
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export async function getAllQuizes(): Promise<QuizInfo[]> {
    const range = 'Metadata!A2:C50';
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res: any = await client.request(options);

        return mapRowsToQuizInfo(res.data.values);
    } catch (err) {
        console.error('error getting metadata sheet info', err);
        return [];
    }
}

function mapRowsToQuizInfo(sheetData: any[]): QuizInfo[] {
    return sheetData.map((sheet: any) => {
        return {
            name: sheet[0],
            url: `/${sheet[1]}/`,
            description: sheet[2] || '',
        };
    });
}

export async function getQuizByQuizUrl(quizUrl: string): Promise<Quiz> {
    const range = `${quizUrl}!A2:C50`;
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res: any = await client.request(options);
        const quiz = await mapRowsToQuiz(res.data.values, quizUrl);

        return quiz
    } catch (err) {
        console.error('error getting metadata sheet info', err);
        return {
            name: '',
            url: quizUrl,
            questions: [],
        };
    }
}

async function mapRowsToQuiz(sheetData: any[], quizUrl: string): Promise<Quiz> {
    const name = await getQuizDisplayName(quizUrl);
    const quiz: Quiz = {
        name,
        url: quizUrl,
        questions: [],
    };

    sheetData.forEach((row) => {
        const question: Question = {
            id: crypto.randomUUID(),
            question: row[0],
            answer: row[1],
            imageUrl: row[2] || '',
        };
        quiz.questions.push(question);
    });

    return quiz;
}

async function getQuizDisplayName(quizUrl: string): Promise<string> {
    const quizes = await getAllQuizes();
    // TODO fix needing slashes around quizUrl
    const matchingQuiz = quizes.find((quiz) => quiz.url === `/${quizUrl}/`);

    if (!matchingQuiz) {
        console.error(`could not find quiz "${quizUrl}"`);
        return '';
    }

    return matchingQuiz.name;
}
