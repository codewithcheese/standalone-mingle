import { mount, unmount } from "svelte";

export class Props {
    wire = null;
    data = $state({});

    constructor(wire, snapshot) {
        this.wire = wire;
        this.update(snapshot);
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

    const props = new Props(wire, wire.__instance.snapshot);
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

    window.Mingle.Elements[name] = {
        boot(mingleId, wire) {
            return createComponent(mingleId, wire, component);
        },
    };
}

export default registerSvelteMingle;
