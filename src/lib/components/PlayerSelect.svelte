<script lang="ts">
    import { createNewPlayer } from '$lib/utils/default-items';
    import type { Player } from '$lib/types';

    interface Props {
        handleSubmit: Function;
        players: Player[];
    }

    let { handleSubmit, players = $bindable() }: Props = $props();

    const onInput = (event: any, index: number) => {
        players[index].name = (event.currentTarget as HTMLInputElement).value;
    };

    const removePlayer = (id: string) => {
        players = players.filter((player) => player.id !== id);
    };

    const addPlayer = () => {
        players.push(createNewPlayer());
    };
</script>

<h2>Enter Player/Team Names</h2>

<form onsubmit={() => handleSubmit()} class="card">
    {#each players as player, index (player.id) }
        <div class="player-entry">
            <input value={player.name} oninput={(e) => onInput(e, index)} required />
            <button type="button" onclick={() => removePlayer(player.id)}>Remove</button>
        </div>
    {/each}
    <section class="controls">
        <button type="button" class="big-btn" onclick={addPlayer}>Add Player/Team</button>
        <button type="submit" class="big-btn">Submit</button>
    </section>

</form>

<style>
    .player-entry {
        justify-self: center;
        display: flex;
    }

    .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
