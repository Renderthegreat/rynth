"use strict";
/*import { ComponentFactory, Component, Config, } from '#~/component';
import { Signal, } from '#~/signal';

import { render, Registry, If, Div, Button, } from '#~/web/elements';
import { hook, } from '#~/hook';

const planet: Signal<string> = new Signal<string>("Earth");

const style: Signal<string> = new Signal<string>("color: green;");

const rickrolled: Signal<boolean> = new Signal<boolean>(false);

const component = <Div>
    <Div id='foo' style={style}>
        Hello, {planet}!
    </Div>
    <Button click={() => {
        console.log("Never gonna give you up...");

        rickrolled.value = true;

        // window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }}>Click here</Button>
    <If condition={rickrolled}>
        <Div>
            Rickrolled!
        </Div>
        <Button click={() => {
            rickrolled.value = false;
        }}>Close</Button>
    </If>
</Div>;

const registry: Registry = new Map();

let node: Node = render({ root: component, registry: registry, });

hook(component, (component: Component) => {
    console.log(component);

    // console.log("Re-rendering...");
    let oldNode: Node = registry.get(component.key)!;
    let newNode: Node = render({ root: component, registry: registry, });

    // TODO: Ensure every `oldNode` is a `ChildNode`.
    (oldNode as ChildNode).replaceWith(newNode);
});

setInterval(() => {
    planet.value = planet.value === "Earth" ? "Mars" : "Earth";
    style.value = style.value === "color: red;" ? "color: green;" : "color: red;";
}, 1000);

window.document.body.appendChild(node);*/ 
