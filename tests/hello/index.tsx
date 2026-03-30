import * as Rynth from '#~/index';

import { render, Registry, } from '#~/web/render';

import { app, } from '#tests/hello/app';

const registry: Registry = new Map();

Rynth.hook(app, (component: Rynth.Component) => {
	// console.log(component);

	// console.log("Re-rendering...");
	let oldNode: Node = registry.get(component.key)!;
	let newNode: Node = render({ root: component, registry: registry, });

	// TODO: Ensure every `oldNode` is a `ChildNode`.
	(oldNode as ChildNode).replaceWith(newNode);
});

window.document.body.appendChild(render({ root: app, registry: registry, }));