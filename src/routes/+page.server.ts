import { getAllQuizes } from "$lib/server/sheets-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const quizInfo = await getAllQuizes();

    return {
        quizInfo,
    };
}
