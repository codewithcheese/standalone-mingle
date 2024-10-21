<script>
    let { wire, data } = $props();

    $inspect("plain", data);
</script>

<div>
    <div>
        <button type="submit" wire:click="increment">Increment</button>
    </div>

    <div>{data.counter}</div>
</div>
