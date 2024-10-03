<script lang="ts">
    let { data } = $props();
</script>

<h1>Welcome to Trivia Host</h1>

<p>Select a quiz to begin</p>

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
</style>
