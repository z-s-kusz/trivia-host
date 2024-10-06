<script lang="ts">
    import type { Game } from '$lib/types';

    interface Props {
        game: Game;
        nextRound: () => void;
    }

    let { game, nextRound }: Props = $props();
</script>

<h2>Round {game.roundIndex + 1} Summary</h2>

{#each game.players as player }
    <section class="card">
        <h4>{player.name}</h4>
        <p>{player.allQuestionsAnswered.length} / {game.quiz.questions.length}</p>
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
</style>
