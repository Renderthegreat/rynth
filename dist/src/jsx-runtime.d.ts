import { Component, ComponentFactory, Child, ComponentConfig } from '#~/component';
import { Class } from 'type-fest';
export declare class FragmentFactory<C = any> implements ComponentFactory<C> {
    readonly symbol: symbol;
    of(config: ComponentConfig<C>): Component<C>;
}
export declare function jsx<C>(type: Class<ComponentFactory<C>>, config: Omit<ComponentConfig<C>, 'children'> & {
    children: Child | Array<Child>;
}): Component<C>;
export declare function jsxs<C>(type: Class<ComponentFactory<C>>, config: ComponentConfig<C>): Component<C>;
export declare namespace JSX {
    type Element = Component;
    type LibraryManagedAttributes<ComponentType, Props> = ComponentType extends Class<ComponentFactory<infer P>> ? P & {
        children?: Child | Array<Child>;
    } : never;
}
