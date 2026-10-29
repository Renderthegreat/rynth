// deno-lint-ignore-file no-namespace
import { Component, compose, cf, type ComponentFactory, type Child } from '#~/component.ts';
import { Signal } from '#~/signal.ts';

/**
 * Don't use this type directly, it's only for the JSX compiler.
 */
export const Fragment: ComponentFactory<{}, Child[]> = cf({
	[compose](config: {}, children: Child[]) {
		return new Component(config, children, Symbol());
	},
});

/**
 * Normalizes mixed inputs (primitives, signals, nested arrays) into a flat tree of valid children.
 * Primitive values are kept as-is so they can later be rendered by the DOM renderer.
 */
function normalizeChildren(childrenRaw: unknown): Child[] {
	if (childrenRaw === undefined || childrenRaw === null) {
		return [];
	};

	const normalized: Child[] = [];
	const rawArray = Array.isArray(childrenRaw) ? childrenRaw : [childrenRaw];

	for (const child of rawArray) {
		if (child === undefined || child === null) {
			continue;
		};

		if (child instanceof Component || child instanceof Signal) {
			normalized.push(child as Child);
			continue;
		};

		if (Array.isArray(child)) {
			normalized.push(...normalizeChildren(child));
			continue;
		};

		// Keep primitive values in their original scalar form; the renderer downstream stringifies them.
		normalized.push(child as Child);
	};

	return normalized;
};

/**
 * Catches <A b="c"/> and maps it to factory[compose]({ b: "c" }, children).
 */
export function jsx<T, C extends Child[]>(
	factory: ComponentFactory<T, C>,
	props: T & { children?: C | C[number] | unknown }
): Component<T, C> {
	const { children: childrenBad, ...config } = props as T & { children?: unknown };
	const children = normalizeChildren(childrenBad) as C;

	return <Component<T, C>> factory[compose](
		config as T,
		children,
	);
};

/**
 * Catches <A b="c">...</A> with multiple static children and bundles properties into config
 */
export function jsxs<T, C extends Child[]>(
	factory: ComponentFactory<T, C>,
	props: T & { children: C | C[number] | unknown }
): Component<T, C> {
	const { children: childrenBad, ...config } = props as T & { children?: unknown };
	const children = normalizeChildren(childrenBad) as C;

	return <Component<T, C>> factory[compose](
		config as T,
		children,
	);
}

export namespace JSX {
	export type Element = Component;

	// export type ElementClass = ComponentFactory<any, any>;

	/**
	 * Explicitly tells the *TypeScript* compiler what types are permitted to be used as a `JSX` element tag name.
	 */
	export type ElementType = ComponentFactory;

	/**
	 * Maps your factory's config type (T) into flat JSX attributes in the source code.
	 * E.g. If T is { b: string }, then <A b="c" /> is expected and validated.
	 */
	export type LibraryManagedAttributes<ComponentType, Props> =
		ComponentType extends ComponentFactory<infer T, infer C>
			? T & { children?: C | C[number] | unknown }
			: never;
}