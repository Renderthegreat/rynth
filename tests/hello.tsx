import { ComponentFactory, Component, Config, } from '#~/component';
import { Signal, } from '#~/signal';

import { render, Div, Button, } from '#~/html';
import { hook, } from '#~/hook';

const planet: Signal<string> = new Signal<string>("Earth");

const style: Signal<string> = new Signal<string>("color: green;");

const component = <Div>
	<Div id="foo" style={style}>
		Hello, {planet}!
	</Div>
	<Button click={() => {
		window.open('https://rickrolled.com/?slug=47tpdhsh');
	}}>Click here (not a Rickroll).</Button>
</Div>;

const registry: Map<symbol, Node> = new Map();

let node: Node = render({ root: component, registry: registry, });

hook(component, (component: Component) => {
	// console.log('Re-rendering...');
	let oldNode: Node = registry.get(component.key)!;
	let newNode: Node = render({ root: component, registry: registry, });

	// TODO: Ensure `oldNode` is a `ChildNode`.
	(oldNode as ChildNode).replaceWith(newNode);
});

setInterval(() => {
	planet.value = planet.value === "Earth" ? "Mars" : "Earth";
	style.value = style.value === "color: red;" ? "color: green;" : "color: red;";
}, 1000);

window.document.body.appendChild(node);