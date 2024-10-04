<script lang="ts">
    import type { Quiz } from '$lib/types';

    interface Props {
        quiz: Quiz,
    }

    let { quiz }: Props = $props();
</script>

{#each quiz.questions as question}
    <details>
        <summary>{question.question}</summary>
        {question.answer}
    </details>
{/each}
