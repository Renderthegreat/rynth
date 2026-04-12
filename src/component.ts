import { Signal, } from '#~/signal';
import { Lifecycle, } from '#~/lifecycle';

// We can't enforce types on this. :(
export type ComponentConfig<T> = T & {
	children: Child[],
};

export class Component<C = unknown> {
	public readonly key: symbol = Symbol();

	public readonly lifecycle: Lifecycle = new Lifecycle({
		
	});

	public constructor(
		public readonly type: symbol,
		public readonly config: ComponentConfig<C>,
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
		for (const child of this.config.children) {
			if (child instanceof Component) {
				// Emit `'unmount'` on children so their lifecycle handlers run and clean-up is centralized through the lifecycle.
				child.lifecycle.emit('unmount');
			};
		};
	};
};

export type Child<C = any> = (Component<C> | Signal<any> | string) | null;

export interface ComponentFactory<C> {
	readonly symbol: symbol;
	
	of(config: ComponentConfig<C>): Component<C>;
};