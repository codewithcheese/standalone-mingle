import { hydrate, unmount } from "svelte";

const svelteComponents = {};
const mountedComponents = {};

export class Props {
    wire = null;
    data = $state({});
    dataset = $state({});

    constructor(wire, dataset) {
        this.wire = wire;
        this.updateDataset(dataset);
        this.updateSnapshot(wire.__instance.snapshot);
    }

    updateSnapshot(snapshot) {
        this.data = snapshot.data;
    }

    updateDataset(dataset) {
        // spread to convert DOM dataset to object
        this.dataset = { ...dataset };
    }
}

function findRoots(wire) {
    return wire.$el.querySelectorAll("[data-svelte]:not(:has([data-mounted]))");
}

function mountRoots(wire) {
    const roots = findRoots(wire);
    for (const root of roots) {
        const svelteComponent =
            svelteComponents["resources/js/components/" + root.dataset.svelte];
        if (!svelteComponent) {
            console.log("No svelte component found for", root.dataset.svelte);
            continue;
        }
        const mountId = crypto.randomUUID();
        const props = new Props(wire, root.dataset);
        const child = document.createElement("div");
        child.setAttribute("data-mounted", mountId);
        root.replaceChildren(child);
        const app = hydrate(svelteComponent, { target: child, props });
        if (!(wire.id in mountedComponents)) {
            mountedComponents[wire.id] = [];
        }
        mountedComponents[wire.id].push({ mountId, app, props });
    }
}

function updateRoot(wire, root) {
    const child = root.firstChild;
    if (!child) {
        return;
    }
    const mountId = child.getAttribute("data-mounted");
    if (!mountId) {
        return;
    }
    const ref = mountedComponents[wire.id].find(
        (ref) => ref.mountId === mountId
    );
    ref.props.updateDataset(root.dataset);
}

function unmountRoot(wireId, root) {
    const child = root.firstChild;
    if (!child || !child.hasAttribute("data-mounted")) {
        return;
    }
    const mountId = child.getAttribute("data-mounted");
    const ref = mountedComponents[wireId].find(
        (ref) => ref.mountId === mountId
    );
    unmountRef(wireId, ref);
}

function unmountRef(wireId, ref) {
    console.log("Unmounting", ref);
    unmount(ref.app);
    const child = document.querySelector(`[data-mounted="${ref.mountId}"]`);
    if (child) {
        child.removeAttribute("data-mounted");
    }
    mountedComponents[wireId] = mountedComponents[wireId].filter(
        (i) => i.mountId !== ref.mountId
    );
}

const modules = import.meta.glob("./**/*.svelte", { eager: true });
for (const [path, module] of Object.entries(modules)) {
    svelteComponents["resources/js" + path.replace("./", "/")] = module.default;
}

Livewire.hook("commit", ({ component, commit, respond, succeed, fail }) => {
    succeed(({ snapshot, effect }) => {
        const mounted = mountedComponents[component.id];
        if (!mounted) {
            return;
        }
        for (const ref of mounted) {
            ref.props.updateSnapshot(JSON.parse(snapshot));
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
            unmountRef(component.id, ref);
        }
        delete mountedComponents[component.id];
        console.log("mountedComponents", mountedComponents);
    });
});

Livewire.hook("effect", ({ component, effects }) => {
    // Wait for dom updates before mounting
    requestIdleCallback(() => {
        mountRoots(component.$wire);
    });
});

Livewire.hook("morph.updated", ({ el, component }) => {
    // If the root is updated, propagate changes to the props
    if (el.hasAttribute("data-svelte")) {
        updateRoot(component.$wire, el);
    }
});

Livewire.hook("morph.removing", ({ el, component, skip }) => {
    // wire.ignore does not prevent the root child from being removed
    // manually skip instead
    if (el.hasAttribute("data-mounted")) {
        skip();
    }
    const roots = el.querySelectorAll(
        "[data-svelte]:not(:has([data-mounted]))"
    );
    console.log("morph.removing", roots);
});

Livewire.hook("morph.removed", ({ el, component }) => {
    // Unmount if root is removed
    const roots = el.querySelectorAll("[data-svelte]:has([data-mounted])");
    if (roots.length) {
        roots.forEach((root) => unmountRoot(component.id, root));
    } else if (el.hasAttribute("data-svelte")) {
        unmountRoot(component.id, el);
    }
});
