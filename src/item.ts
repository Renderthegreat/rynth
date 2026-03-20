export class Item {
	public readonly key: symbol = Symbol('Item.key');

	public constructor(
		public readonly type: symbol,
		public readonly config: Record<string, any>,
	) {

	};
};

export interface ItemFactory {
	of(config: Record<string, any>): Item,
	symbol: symbol,
};