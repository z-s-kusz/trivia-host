<script lang="ts">
    import '$lib/global.css';
</script>

<header>
    <h1>Trivia Host</h1>
    <nav>
        <a href="/">Home</a>
    </nav>
</header>
<hr />

<slot />

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
