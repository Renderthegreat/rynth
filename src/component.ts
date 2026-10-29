import type { Signal, } from '#~/signal.ts';
import { Lifecycle, } from '#~/lifecycle.ts';

// // TODO: Use `Signal` types.
// TODO: Use stop using classes.
export class Component<T = {}, C extends Array<Child> = Array<Child>> {
	public readonly lifecycle: Lifecycle = new Lifecycle({
		
	});

	public constructor(
		public readonly config: T,
		public readonly children: C,
		public readonly key: symbol = Symbol(),
	) {
		// Bind disposal so `this` is preserved and disposal doesn't get called with an incorrect context.
		this.lifecycle.on('unmount', () => this.dispose());
	};

	/**
	 * Disposes of the {@link Component}, and all of its children.
	 */
	private dispose(): void {
		this.lifecycle.cleanup();
		
		// Recursively dispose of children
		for (const child of this.children) {
			if (child instanceof Component) {
				// Emit `'unmount'` on children so their lifecycle handlers run and clean-up is centralized through the lifecycle.
				child.lifecycle.emit('unmount');
			};
		};
	};
};

// TODO: Refine types.
export type PrimitiveChild = string | number | boolean | bigint;

export type Child<T = any> = (Component<T, Child[]> | Signal<any> | PrimitiveChild) | null;

// TODO: Documentation.
export const compose = Symbol('compose');

export interface ComponentFactory<T = {}, C extends Child[] = Child[]> {
	readonly symbol?: symbol;
	
	[compose](config: T, children: C): Component;

	/**
	 * An internal fallback signature for the JSX compiler.
	 * This prevents ts(2604) across all consumer packages.
	 */
	(): void;
};

export type Makes<T> = T extends ComponentFactory<any, any> 
	? (T[typeof compose] extends (...args: any[]) => infer U ? U : never)
	: never;


export function cf<T = {}, C extends Child[] = Child[]>(factory: Omit<ComponentFactory<T, C>, ''>): ComponentFactory<T, C> {
	return Object.assign(factory, () => {});
};


// TODO: Helper types.