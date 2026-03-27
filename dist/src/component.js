import { Lifecycle, } from '#~/lifecycle';
export class Component {
    type;
    config;
    key = Symbol();
    lifecycle = new Lifecycle({});
    constructor(type, config) {
        this.type = type;
        this.config = config;
        // Bind disposal so `this` is preserved and disposal doesn't
        // get called with an incorrect context.
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
                // Emit `unmount` on children so their lifecycle handlers
                // run and cleanup is centralized through the lifecycle.
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
