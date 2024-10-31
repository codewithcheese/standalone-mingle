import { hydrate, mount, unmount } from "svelte";

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

function createComponent(wire, component) {
    console.log("createComponent", wire, component);
    const root = wire.$el.querySelector(".mingle-root");
    if (!root) {
        return;
    }

    const props = new Props(wire);
    const app = mount(component, { target: root, props });

    return {
        unmount: () => unmount(app),
        update: (snapshot) => props.update(snapshot),
    };
}

function registerSvelteMingle(name, component) {
    window.Mingle = window.Mingle || {
        Elements: {},
        Components: {},
        Mounted: {},
    };

    console.log("registerSvelteMingle", name, component);
    window.Mingle.Components[name] = component;
    window.Mingle.Elements[name] = {
        boot(wire) {
            console.log("boot", name, wire, component);
            return createComponent(wire, component);
        },
    };
}

const modules = import.meta.glob("./**/*.svelte", { eager: true });
for (const [path, module] of Object.entries(modules)) {
    registerSvelteMingle(
        "resources/js" + path.replace("./", "/"),
        module.default
    );
}

window.mount = (wire) => {
    const roots = wire.$el.querySelectorAll("[data-svelte]");
    console.log("Found roots", roots, wire.id);
    window.Mingle.Mounted[wire.id] = [];
    for (const root of roots) {
        if (root.getAttribute("data-mounted")) {
            continue;
        }
        console.log("Mounting", root);
        const props = new Props(wire);
        const component =
            window.Mingle.Components[
                "resources/js/components/" + root.dataset.svelte
            ];
        // use hydrate to both mount and resume after navigating
        // navigation unmounts but does not clear the contents of the div
        // when navigating back we can hydrate the contents
        const app = hydrate(component, { target: root, props });
        root.setAttribute("data-mounted", true);
        window.Mingle.Mounted[wire.id].push({ app, props });
    }
};

Livewire.hook("commit", ({ component, commit, respond, succeed, fail }) => {
    succeed(({ snapshot, effect }) => {
        const mounted = window.Mingle.Mounted[component.id];
        if (!mounted) {
            return;
        }
        for (const ref of mounted) {
            ref.props.update(JSON.parse(snapshot));
        }
    });
});

Livewire.hook("component.init", ({ component, cleanup }) => {
    console.log("component.init", component, cleanup);
    cleanup(() => {
        console.log("Cleanup", component);
        if (!window.Mingle.Mounted[component.id]) {
            return;
        }
        for (const app of window.Mingle.Mounted[component.id]) {
            console.log("Unmounting", app);
            unmount(app);
        }
        delete window.Mingle.Mounted[component.id];
    });
});

Livewire.hook("effect", ({ component, effects }) => {
    console.log("effect", component, effects, component.$wire);
    const wire = component.$wire;
    setTimeout(() => {
        window.mount(wire);
    }, 0);
});
