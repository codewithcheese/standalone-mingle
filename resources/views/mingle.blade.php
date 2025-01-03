<div x-data="{
    listeners: [],
    unmount: null,
    init() {
       const {unmount, update} = window.Mingle.Elements['resources/js/components/{{ $component }}']
                .boot(this.$wire)
        this.unmount = unmount
        this.listeners.push(
            Livewire.hook('commit', ({component, commit, respond, succeed, fail}) => {
                succeed(({snapshot, effect}) => {
                    if (component.id === this.$wire.id) {
                        update(JSON.parse(snapshot))
                    }
                })
            })
        );
    },
    destroy() {
        console.log('destroy', '{{ $component }}');
        // remove listeners
        this.listeners.forEach((listener) => {
           listener();
        });
        // unmount component
        if (this.unmount) {
            this.unmount()
        }
    },
}">
    <div class="mingle-container" wire:ignore x-ignore>
        <div class="mingle-root"></div>
    </div>
</div>
@script
<script>
    console.log('block', $wire)
</script>
@endscript
