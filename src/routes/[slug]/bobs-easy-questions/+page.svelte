<script lang="ts">
    import PlayerSelect from '$lib/components/PlayerSelect.svelte';
    import { browser } from '$app/environment';
    import BobQuiz from './BobQuiz.svelte';
    import type { Game } from '$lib/types.js';
    import { createNewPlayer } from '$lib/utils/default-items';
    import Confirm from './Confirm.svelte';

    let { data } = $props();
    let game = $state<Game>({
        id: '',
        mode: 'bob-quiz',
        quiz: data.quiz,
        players: [
            createNewPlayer('0'),
            createNewPlayer('1'),
        ],
        gameState: 'menu',
        roundIndex: 0,
        questionIndex: 0,
        wrongAnswerCounter: 0,
    });

    // not sure why this works without wrapping it in a lifecycle $effect...
    if (browser) {
        game.id = self.crypto.randomUUID();
        game.players[0].id = self.crypto.randomUUID();
        game.players[1].id = self.crypto.randomUUID();
    }

    const handleSubmit = () => {
        game.gameState = 'confirm-setup';
    };

    const confirmSettings = () => {
        game.gameState = 'live-quiz';
    };
    const goBack = () => {
        game.gameState = 'menu';
    };
</script>

{#if game.gameState === 'menu'}
    <PlayerSelect handleSubmit={handleSubmit} bind:players={game.players} />
{:else if game.gameState === 'confirm-setup'}
    <Confirm {game} {confirmSettings} {goBack} />
{:else if game.gameState === 'results'}
    <h2>Game Ended I wonder how you did?</h2>
{:else} <!--live-game -->
    <BobQuiz bind:game={game} />
{/if}
