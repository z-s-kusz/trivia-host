<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1>Select a game mode.</h1>

<p>For teams or 3+ players.</p>
<a href="{$page.params.slug}/bobs-easy-questions/">
    <button type="button" class="big-btn">Bob's Easy Questions</button>
</a>

<p>For 1 or 2 players.</p>
<a href="/{$page.params.slug}/flashcards">
    <button type="button" class="big-btn" disabled>Flashcards</button>
</a>
