import { mount } from "svelte";

export class Props {
    wire = null;
    data = $state({});

    constructor(wire, snapshot) {
        this.wire = wire;
        this.handleSnapshot(snapshot);
    }

    async call(name, ...args) {
        const result = await this.wire[name](...args);
        this.handleSnapshot(this.wire.__instance.snapshot);
        return result;
    }

    async set(name, value) {
        await this.wire.$set(name, value);
        this.handleSnapshot(this.wire.__instance.snapshot);
    }

    handleSnapshot(snapshot) {
        console.log("handleSnapshot", snapshot);
        this.data = snapshot.data;
    }
}

const defaultOptions = {
    autoMount: true,
    createComponent: false,
};

const createComponent = (
    mingleId,
    wireId,
    component,
    options = defaultOptions
) => {
    const root = document.getElementById(mingleId),
        wire = window.Livewire.find(wireId);

    console.log(
        "createComponent",
        wire,
        wire.$el.getAttribute("wire:snapshot")
    );

    if (!root) {
        return;
    }

    const snapshot = JSON.parse(wire.$el.getAttribute("wire:snapshot"));

    mount(component, { target: root, props: new Props(wire, snapshot) });

    return {
        component,
        node: root,
    };
};

const registerSvelteMingle = (name, component, options = defaultOptions) => {
    return new Promise((resolve, reject) => {
        window.Mingle = window.Mingle || {
            Elements: {},
        };

        window.Mingle.Elements[name] = {
            boot(mingleId, wireId) {
                try {
                    const result = createComponent(
                        mingleId,
                        wireId,
                        component,
                        options
                    );
                    if (result) {
                        resolve(result);
                    } else {
                        reject(new Error("Component creation failed"));
                    }
                } catch (error) {
                    reject(error);
                }
            },
        };
    });
};

export default registerSvelteMingle;
