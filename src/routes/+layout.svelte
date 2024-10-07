<script lang="ts">
    import '$lib/global.css';
    import { fade } from 'svelte/transition';

    let { data } = $props();
</script>

<header>
    <h1>Trivia Host</h1>
    <nav>
        <a href="/">Home</a>
    </nav>
</header>
<hr />

{#key data.pathname}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
{/key}

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            margin: 0;
        }
    }
</style>
