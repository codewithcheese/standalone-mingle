<script>
    let { wire, data } = $props();

    $inspect("headless-count", data);
</script>

<div>Count is {data.count}</div>
