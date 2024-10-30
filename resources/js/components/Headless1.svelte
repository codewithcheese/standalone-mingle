<script>
    let { wire, data } = $props();

    $inspect("headless1", data);
</script>

<button type="button" onclick={() => wire.increment()}>Increment</button>
