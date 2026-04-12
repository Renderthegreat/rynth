import { Signal } from '#~/signal';
import { Lifecycle } from '#~/lifecycle';
export type ComponentConfig<T> = T & {
    children: Child[];
};
export declare class Component<C = unknown> {
    readonly type: symbol;
    readonly config: ComponentConfig<C>;
    readonly key: symbol;
    readonly lifecycle: Lifecycle;
    constructor(type: symbol, config: ComponentConfig<C>);
    /**
     * Disposes of the {@link Component}, and all of its children.
     */
    private dispose;
}
export type Child<C = any> = (Component<C> | Signal<any> | string) | null;
export interface ComponentFactory<C> {
    readonly symbol: symbol;
    of(config: ComponentConfig<C>): Component<C>;
}
