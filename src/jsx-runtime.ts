import { Item, ItemFactory } from '#~/item';

type Config = {
	children: (Item | string)[],
	[key: string]: any,
};

export class Fragment implements ItemFactory {
	public readonly symbol: symbol = Symbol('');

	public of(config: Config): Item {
		return new Item(this.symbol, config);
	};
};

export function jsx(type: ItemFactory, config: Config): Item {
	return (new (type as any)()).of(
		config,
	);
};

export function jsxs(type: ItemFactory, config: Config): Item {
	let children: Item[] = [];

	for (const child of config.children) {
		if (child instanceof Item) {
			children.push(child);
			continue;
		};

		children.push(jsx(Fragment as unknown as ItemFactory, { children: [child], })); // Cast to `unknown` should not be required here.
	};

	return (new (type as any)()).of({
		...config,
		children,
	});
};

export namespace JSX {
	export type Element = Item;
	
	export interface IntrinsicElements {
		// [key: string]: any,
	};
};