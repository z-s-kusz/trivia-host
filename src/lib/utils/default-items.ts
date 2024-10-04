import type { Player } from '$lib/types';

export const createNewPlayer = (id?: string): Player => {
    return {
        id: id || self.crypto.randomUUID(),
        name: '',
        allQuestionsAnswered: [],
        answersByRound: [[]],
    };
};
