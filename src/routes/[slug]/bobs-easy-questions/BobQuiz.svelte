<script lang="ts">
    import type { Game, Player } from '$lib/types';
    import getAllQuestionsAnswered from '$lib/utils/getAllQuestionsAnswered';

    interface History {
        player: Player | null;
        questionIndex: number;
        questionId: string;
    }

    interface Props {
        game: Game;
        finishRound: () => void;
    }

    let { game = $bindable(), finishRound }: Props = $props();
    let previousEntry = $state<History | null>(null);
    let currentQuestion = $derived(game.quiz.questions[game.questionIndex]);

    const enterResponse = (responder?: Player) => {
        previousEntry = {
            player: responder || null,
            questionIndex: game.questionIndex,
            questionId: currentQuestion.id,
        };

        if (responder) {
            responder.answersByRound[game.roundIndex].push(currentQuestion.id);
            responder.allQuestionsAnswered = getAllQuestionsAnswered(responder.answersByRound);
        } else {
            game.wrongAnswerCounter = game.wrongAnswerCounter + 1;
        }

        incrementQuestion();
    };

    const undoLastEntry = () => {
        if (!previousEntry) return console.error('tried to undo with no previous entry');

        if (previousEntry.player) undoLastPlayerCredit(previousEntry);
        game.questionIndex = previousEntry.questionIndex;
        previousEntry = null;
    };

    function incrementQuestion() {
        if (game.questionIndex + 1 >= game.quiz.questions.length) {
            finishRound();
        } else {
            game.questionIndex = game.questionIndex + 1;
        }
    }

    function undoLastPlayerCredit(previousEntry: History) {
        const player = game.players.find((player) => player.id === previousEntry.player?.id);
        if (!player) return console.error('undoLastPlayerCredit error: no player found');

        let answersByCurrentRound = player.answersByRound[game.roundIndex];
        answersByCurrentRound = answersByCurrentRound.filter((questionId) => questionId !== previousEntry.questionId);

        player.allQuestionsAnswered = getAllQuestionsAnswered(player.answersByRound);
    }
</script>

{#if previousEntry && game.questionIndex !== 0}
    <button type="button" onclick={undoLastEntry}>Undo Last Qustion</button>
{/if}
<details>
    <summary>{currentQuestion.question}</summary>
    {currentQuestion.answer}
</details>

<p>If someone answered correctly select that player/team, otherwise select 'No One Knows'</p>
<button type="button" class="big-btn" onclick={() => enterResponse()}>No One Knows</button>

{#each game.players as player }
    <button type="button" class="big-btn" onclick={() => enterResponse(player)}>
        {player.name}
    </button>
{/each}
