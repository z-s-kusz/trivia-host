import type { Player } from '$lib/types';

// id option is becuase I was running into issues accessing self/window on SSR component mount
export const createNewPlayer = (id?: string): Player => {
    return {
        id: id || self.crypto.randomUUID(),
        name: '',
        allQuestionsAnswered: [],
        answersByRound: [[]],
    };
};
