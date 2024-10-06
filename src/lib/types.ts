export type Player = {
    id: string;
    name: string;
    allQuestionsAnswered: string[];
    answersByRound: string[][];
}

export type Question = {
    id: string;
    imageUrl?: string;
    question: string;
    answer: string;
}

// QuizInfo for home page
// this way I can leave 'questions' property off without having to null check everywhere else in the app
export type QuizInfo = {
    name: string;
    url: string;
    description?: string;
};

export interface Quiz extends QuizInfo {
    questions: Question[];
}

export type Game = {
    id: string;
    mode: 'bob-quiz' | 'flashcard'
    quiz: Quiz;
    players: Player[];
    gameState: 'menu' | 'confirm-setup' | 'live-quiz' | 'results';
    questionIndex: number;
    roundIndex: number;
    wrongAnswerCounter: number;
}
