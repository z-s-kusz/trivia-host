<script lang="ts">
    import type { Game } from '$lib/types';

    interface Props {
        game: Game,
        confirmSettings: () => void,
        goBack: () => void,
    }

    let { confirmSettings, goBack, game }: Props = $props();
    let playerPlayersMessage = $derived.by(() => {
        if (game.players.length === 1) return '1 player';
        return `${game.players.length} players`;
    });
</script>

<h2>Confirm Settings</h2>

<h3>Play {game.quiz.name} with {playerPlayersMessage}?</h3>
<ul>
    {#each game.players as player}
        <li>{player.name}</li>
    {/each}
</ul>

<section class="controls">
    <div>
        <a href="/">
            <button type="button">Change Quiz</button>
        </a>

        <button type="button" onclick={goBack}>Change Names</button>
    </div>

    <button type="button" class="big-btn" onclick={confirmSettings}>Confirm</button>
</section>

<style>
    .controls {
        display: flex;
        flex-direction: column;

        div {
            width: min(100%, 400px);
            display: flex;
            justify-content: space-between;

            button:nth-child(2) {
                /* thanks water.css, won't be using you again */
                margin-right: 0;
            }
        }
    }
</style>
