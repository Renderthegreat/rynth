import { Component, ComponentFactory, Child, ComponentConfig, } from '#~/component';

import { Class, } from 'type-fest';

export class FragmentFactory<C = any> implements ComponentFactory<C> {
	public readonly symbol = Symbol('');

	public of(config: ComponentConfig<C>): Component<C> {
		return new Component(this.symbol, config);
	};
};

/**
 * Don't use this type, it's only for the JSX compiler.
 */
export class Fragment extends FragmentFactory { };

export function jsx<C>(type: Class<ComponentFactory<C>>, config: Omit<ComponentConfig<C>, 'children'> & { children: Child | Array<Child> }): Component<C> {
	const children: Array<Child> = (config.children instanceof Array ? config.children : [config.children])!;

	return (new type()).of({
		...(config as ComponentConfig<C>),
		children: children,
	});
};

export function jsxs<C>(type: Class<ComponentFactory<C>>, config: ComponentConfig<C>): Component<C> {
	let children: Array<Component> = [];

	for (const child of config.children) {
		if (child instanceof Component) {
			children.push(child);

			continue;
		};

		children.push(jsx(FragmentFactory, { children: [child], }));
	};

	return (new type()).of({
		...config,
		children: children,
	});
};

export namespace JSX {
	export type Element = Component;

	/*export interface IntrinsicElements {
		// [key: string]: any;
	};*/

	export type LibraryManagedAttributes<ComponentType, Props> = // ? `Props` is required, but it isn't used here.
		ComponentType extends Class<ComponentFactory<infer P>>
		? P & { children?: Child | Array<Child>; }
		: never
	;
};

