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

function createComponent(mingleId, wire, component) {
    const root = document.getElementById(mingleId);
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
        boot(mingleId, wire) {
            console.log("boot", name, mingleId, wire, component);
            return createComponent(mingleId, wire, component);
        },
    };
}

export default registerSvelteMingle;
