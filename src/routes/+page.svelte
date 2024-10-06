<script lang="ts">
    let { data } = $props();
</script>

<h2>Welcome to Trivia Host</h2>

<p>
    <b>Select a quiz to begin</b>
</p>

{#each data.quizInfo as quiz }
    <section class="card">
        {#if quiz.description}
            <p>{quiz.description}</p>
        {/if}
        <a href={quiz.url}>
            <button type="button" class="big-btn">{quiz.name}</button>
        </a>
    </section>
{/each}
