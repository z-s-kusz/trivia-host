<script lang="ts">
    import { createNewPlayer } from '$lib/utils/default-items';
    import type { Player } from '$lib/types';

    interface Props {
        handleSubmit: Function,
        players: Player[],
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

<h1>Enter Player/Team Names</h1>

<form onsubmit={() => handleSubmit()}>
    {#each players as player, index (player.id) }
        <div class="player-entry">
            <input value={player.name} oninput={(e) => onInput(e, index)} required />
            <button type="button" onclick={() => removePlayer(player.id)}>Remove</button>
        </div>
    {/each}
    <button type="button" onclick={addPlayer}>Add Player/Team</button>
    <button type="submit">Enter</button>
</form>

<style>
    .player-entry {
        display: flex;
    }
</style>
