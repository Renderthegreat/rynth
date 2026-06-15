import { Lifecycle, } from '#~/lifecycle.ts';
// TODO: Use `Signal` types.
export class Component {
    config;
    key;
    lifecycle = new Lifecycle({});
    constructor(config, key = Symbol()) {
        this.config = config;
        this.key = key;
        // Bind disposal so `this` is preserved and disposal doesn't get called with an incorrect context.
        this.lifecycle.on('unmount', () => this.dispose());
    }
    ;
    /**
     * Disposes of the {@link Component}, and all of its children.
     */
    dispose() {
        this.lifecycle.cleanup();
        // Recursively dispose of children
        for (const child of this.config.children) {
            if (child instanceof Component) {
                // Emit `'unmount'` on children so their lifecycle handlers run and clean-up is centralized through the lifecycle.
                child.lifecycle.emit('unmount');
            }
            ;
        }
        ;
    }
    ;
}
;
;
