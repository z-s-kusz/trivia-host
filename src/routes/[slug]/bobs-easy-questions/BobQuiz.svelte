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

    function getWinClass(player: Player): string {
        return player.allQuestionsAnswered.includes(currentQuestion.id) ? 'win' : '';
    }
</script>

<h2>Question {game.questionIndex + 1}</h2>
<details>
    <summary>{currentQuestion.question}</summary>
    {currentQuestion.answer}
</details>

<section class="controls">
    <button type="button" class="big-btn" onclick={() => enterResponse()}>No One Knows</button>

    {#each game.players as player }
        <button type="button" class="big-btn {getWinClass(player)}" onclick={() => enterResponse(player)}>
            {player.name}
        </button>
    {/each}

    {#if previousEntry && game.questionIndex !== 0}
        <hr />
        <button type="button" class="big-btn" onclick={undoLastEntry}>Undo Last Qustion</button>
    {/if}
</section>

<footer>
    <details>
        <summary>Help</summary>
        <p>Select the player/team that answers correctly, otherwise select 'No One Knows.'</p>
        <p>
            'Undo Last entry' is an undo button in case you clicked an incorrect tem/player.
            It takes you back to the previous question and removes the point awarded on the previous question.
        </p>
    </details>
</footer>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            margin-right: 0;
        }
    }
    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 0 1rem;
        border-top: none;
    }

    .win {
         background-color: var(--correct-color);
    }
</style>
