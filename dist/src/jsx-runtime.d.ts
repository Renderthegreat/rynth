import { Component, type ComponentFactory, type Child, type ComponentConfig } from '#~/component.ts';
import type { Class } from 'type-fest';
export declare class FragmentFactory<C = any> implements ComponentFactory<C> {
    of(config: ComponentConfig<C>): Component<C>;
}
/**
 * Don't use this type, it's only for the JSX compiler.
 */
export declare class Fragment extends FragmentFactory {
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
