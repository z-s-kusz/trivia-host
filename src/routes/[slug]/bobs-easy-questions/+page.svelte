<script lang="ts">
    import PlayerSelect from '$lib/components/PlayerSelect.svelte';

    let { data } = $props();

console.log('we got data?', data.quiz);
</script>

<PlayerSelect />
