import * as Rynth from '#~/index';
import { render, } from '#~/web/render';
import { app, } from '#tests/hello/app';
const registry = new Map();
Rynth.hook(app, (component) => {
    // console.log(component);
    // console.log("Re-rendering...");
    let oldNode = registry.get(component.key);
    let newNode = render({ root: component, registry: registry, });
    // TODO: Ensure every `oldNode` is a `ChildNode`.
    oldNode.replaceWith(newNode);
});
window.document.body.appendChild(render({ root: app, registry: registry, }));
