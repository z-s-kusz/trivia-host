<script lang="ts">
    import PlayerSelect from '$lib/components/PlayerSelect.svelte';
    import { browser } from '$app/environment';
    import BobQuiz from './BobQuiz.svelte';
    import type { Game } from '$lib/types.js';
    import { createNewPlayer } from '$lib/utils/default-items';

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
</script>

<PlayerSelect handleSubmit={handleSubmit} bind:players={game.players} />

<BobQuiz quiz={game.quiz} />
