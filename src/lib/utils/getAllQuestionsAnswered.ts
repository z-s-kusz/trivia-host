export default function getAllQuestionsAnswered(answeredByRound: string[][]): string[] {
    const questionsSet = new Set<string>();

    answeredByRound.forEach((round) => {
        round.forEach((questionId) => {
            questionsSet.add(questionId);
        });
    });

    return [...questionsSet];
}
