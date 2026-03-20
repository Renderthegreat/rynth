import { Item, } from '#~/item';

export function render({ root, registry, }: { root: Item, registry: Map<symbol, Node> }): Node {
	const node: Node = root.type.description !== '' ?
		window.document.createElement(root.type.description as keyof HTMLElementTagNameMap) : // `string` → `keyof HTMLElementTagNameMap`.
		window.document.createTextNode(String(root.config.children[0]))
	;

	console.log(root, node);

	registry.set(root.key, node);

	for (const [key, value] of Object.entries(root.config)) {
		if (key === 'children') {
			continue;
		};

		if (node instanceof HTMLElement) {
			node.setAttribute(key, value);
		};
	};
	
	for (const child of root.config.children) {
		if (child instanceof Item) {
			node.appendChild(render({ root: child, registry }));
			continue;
		};
	};
	
	return node;
};