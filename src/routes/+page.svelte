<script lang="ts">
    let { data } = $props();
</script>

<h2>Welcome to Trivia Host</h2>

<p>
    <b>Select a quiz to begin</b>
</p>

{#each data.quizInfo as quiz }
    <article class="quiz-info">
        {#if quiz.description}
        <!-- TODO make this section look properly tied together -->
            <p>{quiz.description}</p>
        {/if}
        <a href={quiz.url}>
            <button type="button" class="big-btn">{quiz.name}</button>
        </a>
    </article>
{/each}

<style>
    article {
        /* --text-main from water.css */
        border: 2px solid var(--text-main);
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>
