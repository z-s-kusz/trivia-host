<script lang="ts">
    import type { Game, Player } from '$lib/types';

    interface Props {
        game: Game;
        nextRound: () => void;
    }

    let { game, nextRound }: Props = $props();

    const showWinClass = (player: Player): string => {
        return player.allQuestionsAnswered.length === game.quiz.questions.length ? 'win' : '';
    };

</script>

<h2>Round {game.roundIndex + 1} Summary</h2>

{#each game.players as player }
    <section class="card">
        <h4>{player.name}</h4>
        <p class={showWinClass(player)}>
            <b>Overall:</b>  {player.allQuestionsAnswered.length}/{game.quiz.questions.length}
        </p>

            {#if game.roundIndex > 0}
                {#each player.answersByRound as answersByRound, roundIndex}
                    <p><b>Round {roundIndex + 1}:</b>  {answersByRound.length}/{game.quiz.questions.length}</p>
                {/each}
            {/if}
    </section>
{/each}

<section class="controls">
    <button type="button" class="big-btn" onclick={nextRound}>Start New Round</button>
    <a href="/">
        <button type="button" class="big-btn">End Game</button>
    </a>
</section>

<style>
    .controls {
        display: flex;
        flex-direction: column;
    }
    .card {
        h4 {
            margin: 0;
            line-height: 1.5rem;
            border-bottom: 1px solid var(--text-main);
        }
        P {
            margin: 0.5rem 0;
        }
    }
    .win {
        background-color: var(--correct-color);
    }
</style>
