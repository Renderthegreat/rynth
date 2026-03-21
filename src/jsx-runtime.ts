import { Component, ComponentFactory, Child, Config, } from '#~/component';

import { Class } from 'type-fest';

export class Fragment implements ComponentFactory<{}> {
	public readonly symbol: symbol = Symbol('');

	public of(config: Config<{}>): Component<{}> {
		return new Component(this.symbol, config);
	};
};

export function jsx<C>(type: Class<ComponentFactory<C>>, config: Omit<Config<C>, 'children'> & { children: Child | Array<Child> }): Component<C> {
	const children: Array<Child> = (config.children instanceof Array ? config.children : [config.children])!;

	console.log(config, children);

	return (new type()).of({
		...(config as Config<C>),
		children: children,
	});
};

export function jsxs<C>(type: Class<ComponentFactory<C>>, config: Config<C>): Component<C> {
	let children: Array<any> = [];

	for (const child of config.children) {
		if (child instanceof Component) {
			children.push(child);
			continue;
		};

		children.push(jsx(Fragment, { children: [child], }));
	};

	return (new type()).of({
		...config,
		children: children as any,
	});
};

export namespace JSX {
	export type Element = Component;

	export interface IntrinsicElements {
		// [key: string]: any;
	};

	// When a JSX element uses a class/constructor as the tag, infer the
	// attribute type from `ComponentFactory<C>` by extracting `C` and
	// returning `Config<C>` so attributes are checked against the
	// component's config shape (including `children`).
	export type LibraryManagedAttributes<ComponentType, Props> =
		ComponentType extends new (...args: any[]) => ComponentFactory<infer C>
			? (Partial<Omit<Config<C>, 'children'>> & { children?: Child | Array<Child> })
			: Props;
};