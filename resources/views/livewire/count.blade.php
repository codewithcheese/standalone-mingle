<div>
    <div>{{$count}}</div>
    <button type="button" wire:click="$dispatch('show-message', { id: 1 })">Show Message</button>
    <div>
        <a href="/" wire:navigate>Navigate</a> to test cleanup
    </div>
    <button type="button" wire:click="pop()">Pop</button>
    <div wire:ignore data-svelte="Headless1.svelte"></div>
    <div wire:ignore data-svelte="Headless2.svelte"></div>
    @foreach($ids as $id)
        <div>
            <div>{{$id}}</div>
            <div wire:ignore data-id="{{$id}}" data-svelte="HeadlessItem.svelte"></div>
        </div>
    @endforeach
</div>