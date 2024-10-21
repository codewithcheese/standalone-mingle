<script>
    let contents = $state([]);

    let show = $state(true);

    async function fetchComponent() {
        const res = await fetch("/plain");
        if (!res.ok) {
            return;
        }
        contents.push(await res.text());
    }
</script>

{#if show}
    {#each contents as content}
        {@html content}
    {/each}
{/if}
<a onclick={fetchComponent}>Fetch</a>
<a onclick={() => (show = !show)}>Toggle</a>
