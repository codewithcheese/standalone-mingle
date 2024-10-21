<script>
    import Wire from "./Wire.svelte";

    let components = $state([]);

    let show = $state(true);
    let count = $state(0);

    async function fetchComponent() {
        // fetch a snapshot to create a wire component
        const res = await fetch("/api/mount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: "Click",
                params: { count },
                key: null,
                parent: null,
            }),
        });
        if (!res.ok) {
            return;
        }
        const component = await res.json();
        components.push(component);
    }
</script>

{#if show}
    {#each components as component}
        <Wire snapshot={component.snapshot} />
    {/each}
{/if}
<a onclick={fetchComponent}>Fetch</a>
<a onclick={() => (show = !show)}>Toggle</a>
