<div>
    <div>{{$count}}</div>
    <a href="/" wire:navigate>Navigate</a> to test cleanup
    <div wire:ignore data-svelte="Headless1.svelte"></div>
    <div wire:ignore data-svelte="Headless2.svelte"></div>
</div>
@script
<script>
    mount($wire);
</script>
@endscript
