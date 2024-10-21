import { mount, unmount } from "svelte";

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
    };

    console.log("registerSvelteMingle", name, component);

    window.Mingle.Elements[name] = {
        boot(wire) {
            console.log("boot", name, wire, component);
            return createComponent(wire, component);
        },
    };
}

export default registerSvelteMingle;
