import { google } from 'googleapis';
import { SHEET_ID, GOOG_CREDENTIALS } from '$env/static/private';
import type { Question, Quiz } from '$lib/types.js';

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = SHEET_ID;
const keys = JSON.parse(GOOG_CREDENTIALS);
const client = google.auth.fromJSON(keys);
// @ts-ignore
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function getQuizByName(sheetUrl: string) {
    const range = `${sheetUrl}!A2:C50`;
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res: any = await client.request(options);

        return mapSheetData(res.data.values, sheetUrl);
    } catch (err) {
        console.error('error getting metadata sheet info', err);
        return {
            name: '',
            url: sheetUrl,
            questions: [],
        };
    }
}

function mapSheetData(sheetData: any[], sheetUrl: string): Quiz {
    const quiz: Quiz = {
        name: 'name',
        url: sheetUrl,
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

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    console.log(params);
    const quiz = await getQuizByName(params.slug);

    return {
        quiz,
    };
}
