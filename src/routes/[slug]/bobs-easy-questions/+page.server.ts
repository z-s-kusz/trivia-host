import { getQuizByQuizUrl } from '$lib/server/sheets-data';
import type { PageServerLoad } from './$types'; 

export const load: PageServerLoad =  async ({ params }) => {
    const quiz = await getQuizByQuizUrl(params.slug);

    return {
        quiz,
    };
}
