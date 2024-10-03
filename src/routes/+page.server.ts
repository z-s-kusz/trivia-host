import { google } from 'googleapis';
import { SHEET_ID, GOOG_CREDENTIALS } from '$env/static/private';
import type { QuizInfo } from '$lib/types';

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const metaDatasheet = 'Metadata';
const sheetId = SHEET_ID;
const keys = JSON.parse(GOOG_CREDENTIALS);
const client = google.auth.fromJSON(keys);
// @ts-ignore
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function getAllQuizes() {
    const range = `${metaDatasheet}!A2:C50`;
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res: any = await client.request(options);

        return mapSheetData(res.data.values);
    } catch (err) {
        console.error('error getting metadata sheet info', err);
        return [];
    }
}

function mapSheetData(sheetData: any[]): QuizInfo[] {
    return sheetData.map((sheet: any) => {
        console.log(sheet)
        return {
            name: sheet[0],
            url: `/${sheet[1]}/`,
            description: sheet[2] || '',
        };
    });
}

/** @type {import('./$types').PageLoad} */
export async function load() {
    const quizInfo = await getAllQuizes();
    return {
        quizInfo,
    };
}
