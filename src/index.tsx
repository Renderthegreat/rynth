import { ItemFactory, Item, } from '#~/item';
import { Signal, } from '#~/signal';

import { render, } from '#~/html';
import { hook, } from '#~/hook';

class Div implements ItemFactory {
	public readonly symbol: symbol = Symbol('Div');

	public of(config: Record<string, any>): Item {
		return new Item(Symbol.for('Div'), config);
	};
};

const planet: Signal<String> = new Signal<String>("Earth");

const style: Signal<String> = new Signal<String>("color: red;");

const item: Item = <Div id="foo" style={style}>
	Hello, {planet}!
</Div>;

const registry: Map<symbol, Node> = new Map();

let node: Node = render({ root: item, registry: registry, });

window.document.body.appendChild(node);

hook(item, (item: Item) => {
	console.log('Re-rendering...');
	let oldNode: Node = registry.get(item.key)!;
	let newNode: Node = render({ root: item, registry: registry, });

	// TODO: Ensure `oldNode` is a `ChildNode`.
	(oldNode as ChildNode).replaceWith(newNode);
});

setInterval(() => {
	planet.value = planet.value === "Earth" ? "Mars" : "Earth";
	style.value = style.value === "color: red;" ? "color: green;" : "color: red;";
}, 1000);