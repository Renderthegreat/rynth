import type { Signal } from '#~/signal.ts';
import { Lifecycle } from '#~/lifecycle.ts';
export type ComponentConfig<T> = T & {
    children: Child[];
};
export declare class Component<C = unknown> {
    readonly config: ComponentConfig<C>;
    readonly key: symbol;
    readonly lifecycle: Lifecycle;
    constructor(config: ComponentConfig<C>, key?: symbol);
    /**
     * Disposes of the {@link Component}, and all of its children.
     */
    private dispose;
}
export type Child<C = any> = (Component<C> | Signal<any> | string) | null;
export interface ComponentFactory<C> {
    readonly symbol?: symbol;
    of(config: ComponentConfig<C>): Component<C>;
}
