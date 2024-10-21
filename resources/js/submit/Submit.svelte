<script>
    let { wire, data } = $props();

    $inspect("submit", data);
</script>

<div class="py-4">
    <p>Wire:submit example</p>
    <form class="flex flex-col gap-2" wire:submit="save">
        <div>
            <input type="text" wire:model="title" />
        </div>
        <div>
            <textarea wire:model="content" />
        </div>
        <div>
            <button
                class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                type="submit"
                >Save
            </button>
        </div>
    </form>
</div>
