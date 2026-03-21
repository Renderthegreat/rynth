import { jsxs as _jsxs, jsx as _jsx } from "rynth/jsx-runtime";
import { Signal, } from '#~/signal';
import { render, Div, Button, } from '#~/html';
import { hook, } from '#~/hook';
const planet = new Signal("Earth");
const style = new Signal("color: green;");
const component = _jsxs(Div, { children: [_jsxs(Div, { id: "foo", style: style, children: ["Hello, ", planet, "!"] }), _jsx(Button, { onclick: () => {
                window.open('https://rickrolled.com/?slug=47tpdhsh');
            }, children: "Click here (not a Rickroll)." })] });
const registry = new Map();
let node = render({ root: component, registry: registry, });
hook(component, (component) => {
    // console.log('Re-rendering...');
    let oldNode = registry.get(component.key);
    let newNode = render({ root: component, registry: registry, });
    // TODO: Ensure `oldNode` is a `ChildNode`.
    oldNode.replaceWith(newNode);
});
setInterval(() => {
    planet.value = planet.value === "Earth" ? "Mars" : "Earth";
    style.value = style.value === "color: red;" ? "color: green;" : "color: red;";
}, 1000);
window.document.body.appendChild(node);
