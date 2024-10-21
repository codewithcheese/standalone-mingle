<script>

    let { wire, data} = $props();

    $inspect('click', data)
</script>

<div class="py-4">
    <p>Wire:click example</p>
    <button class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" wire:click="increment">
        Increment
    </button>
    <p>Count: { data.count }</p>
</div>

