import { hydrate, unmount } from "svelte";

const svelteComponents = {};
const mountedComponents = {};

export class Props {
    wire = null;
    data = $state({});

    constructor(wire) {
        this.wire = wire;
        this.update(wire.__instance.snapshot);
    }

    update(snapshot) {
        this.data = snapshot.data;
    }
}

function findUnmountedRoots(wire) {
    return wire.$el.querySelectorAll("[data-svelte]:not([data-mounted])");
}

function mountRoots(wire) {
    const roots = findUnmountedRoots(wire);
    for (const root of roots) {
        if (
            !svelteComponents["resources/js/components/" + root.dataset.svelte]
        ) {
            console.log("No svelte component found for", root.dataset.svelte);
            continue;
        }
        // get svelte component from registry
        const svelteComponent =
            svelteComponents["resources/js/components/" + root.dataset.svelte];
        const mountId = crypto.randomUUID();
        const props = new Props(wire);
        const app = hydrate(svelteComponent, { target: root, props });
        root.setAttribute("data-mounted", mountId);
        if (!(wire.id in mountedComponents)) {
            mountedComponents[wire.id] = [];
        }
        mountedComponents[wire.id].push({ mountId, app, props });
    }
}

const modules = import.meta.glob("./**/*.svelte", { eager: true });
for (const [path, module] of Object.entries(modules)) {
    svelteComponents["resources/js" + path.replace("./", "/")] = module.default;
}

Livewire.hook("commit", ({ component, commit, respond, succeed, fail }) => {
    succeed(({ snapshot, effect }) => {
        const mounted = mountedComponents[component.id];
        if (!mounted) {
            // console.log("No mounted components");
            return;
        }
        for (const ref of mounted) {
            // console.log("update", ref.props, JSON.parse(snapshot));
            ref.props.update(JSON.parse(snapshot));
        }
    });
});

Livewire.hook("component.init", ({ component, cleanup }) => {
    console.log("component.init", component, cleanup);
    cleanup(() => {
        console.log("Cleanup", component);
        if (!mountedComponents[component.id]) {
            return;
        }
        for (const ref of mountedComponents[component.id]) {
            console.log("Unmounting", ref);
            unmount(ref.app);
        }
        delete mountedComponents[component.id];
        console.log("mountedComponents", mountedComponents);
    });
});

Livewire.hook("effect", ({ component, effects }) => {
    // wait for dom updates before mounting
    requestIdleCallback(() => {
        mountRoots(component.$wire);
    });
});
