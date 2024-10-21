<script>
    let { snapshot } = $props();
    let { id, name } = $derived(snapshot.memo);
    let wire = null;
    let data = $state(snapshot.data);

    window.channel = window.channel || {};
    window.channel[id] = function (_wire) {
        console.log("wire", _wire.id);
        wire = _wire;
        window.Livewire.hook(
            "commit",
            ({ component, commit, respond, succeed, fail }) => {
                succeed(({ snapshot, effect }) => {
                    if (component.id === _wire.id) {
                        console.log("update", snapshot);
                        data = JSON.parse(snapshot).data;
                    }
                });
            }
        );
    };

    function escapeHtml(str) {
        const p = new DOMParser();
        const doc = p.parseFromString("", "text/html");
        const node = doc.createTextNode(str);
        const div = doc.createElement("div");
        div.appendChild(node);
        return div.innerHTML;
    }

    function init() {
        console.log("init", name);
    }
</script>

<div
    x-data={`{
        listeners: [],
        unmount: null,
        init() {
           console.log('init', this.$wire)
           window.channel['${id}'](this.$wire)
        }
    }`}
    wire:snapshot={escapeHtml(JSON.stringify(snapshot))}
    wire:effects="[]"
    wire:id={id}
/>
<div>Count: {data.count}</div>
<a onclick={() => wire.increment()}>Increment</a>
