<script lang="ts">
    import { fade } from 'svelte/transition';

    let { children }: any = $props(); // children is reserved in svelte5, not sure how to type it yet
</script>

<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 250 }}>
    {@render children()}
</div>
