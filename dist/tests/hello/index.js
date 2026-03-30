import * as Rynth from '#~/index';
import { render, } from '#~/web/render';
import { app, } from '#tests/hello/app';
import { Style, FillType, } from '#~/style/index';
import chroma from 'chroma-js';
const registry = new Map();
Rynth.hook(app, (component) => {
    // console.log(component);
    // console.log("Re-rendering...");
    let oldNode = registry.get(component.key);
    let newNode = render({ root: component, registry: registry, });
    // TODO: Ensure every `oldNode` is a `ChildNode`.
    oldNode.replaceWith(newNode);
});
const appStyle = new Style();
appStyle.background = {
    type: FillType.Color,
    ...(chroma.oklab(0.1, 0.1, 0.1)),
};
console.log(appStyle.toCSS());
window.document.body.appendChild(render({ root: app, registry: registry, }));
