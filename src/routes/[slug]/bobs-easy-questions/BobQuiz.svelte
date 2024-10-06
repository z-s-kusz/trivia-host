<script lang="ts">
    import type { Game, Player } from '$lib/types';
    import dedupedArray from '$lib/utils/dedupedArray';

    interface History {
        player: Player | null,
        questionIndex: number,
    }

    interface Props {
        game: Game,
    }

    let { game = $bindable() }: Props = $props();
    let previousEntry = $state<History | null>(null);
    let currentQuestion = $derived(game.quiz.questions[game.questionIndex]);

    const enterResponse = (responder?: Player) => {
        previousEntry = {
            player: responder || null,
            questionIndex: game.questionIndex,
        };

        if (responder) {
            responder.allQuestionsAnswered = dedupedArray(currentQuestion.id, responder.allQuestionsAnswered);
            responder.answersByRound[game.roundIndex].push(currentQuestion.id);
        } else {
            game.wrongAnswerCounter = game.wrongAnswerCounter + 1;
        }

        // increment question last
        game.questionIndex = game.questionIndex + 1;
    };

    const undoLastEntry = () => {
        if (!previousEntry) return console.error('tried to undo with no previous entry');

        game.questionIndex = previousEntry.questionIndex;
        previousEntry = null;
    };
</script>

{#if previousEntry}
    <button type="button" onclick={undoLastEntry}>Undo</button>
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
