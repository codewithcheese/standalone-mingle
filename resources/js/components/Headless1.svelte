<script>
    let { wire, data } = $props();
    let message = $state("Waiting for event...");

    $inspect("headless1", data);

    wire.on("show-message", ({ id }) => {
        message = `Event received from ${id}`;
    });
</script>

<button type="button" onclick={() => wire.increment()}>Increment</button>
<div>{message}</div>
