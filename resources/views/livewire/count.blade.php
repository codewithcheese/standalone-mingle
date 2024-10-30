<div>
    <div>{{$count}}</div>
    <button type="button" wire:click="$dispatch('show-message', { id: 1 })">Show Message</button>
    <div>
        <a href="/" wire:navigate>Navigate</a> to test cleanup
    </div>
    <div wire:ignore data-svelte="Headless1.svelte"></div>
    <div wire:ignore data-svelte="Headless2.svelte"></div>
</div>
@script
<script>
    mount($wire);
</script>
@endscript
