import { jsxs as _jsxs } from "rynth/jsx-runtime";
import { Item, } from '#~/item';
import { Signal, } from '#~/signal';
import { render, } from '#~/html';
import { hook, } from '#~/hook';
class Div {
    symbol = Symbol('Div');
    of(config) {
        return new Item(Symbol.for('Div'), config);
    }
    ;
}
;
const planet = new Signal("Earth");
const style = new Signal("color: red;");
const item = _jsxs(Div, { id: "foo", style: style, children: ["Hello, ", planet, "!"] });
const registry = new Map();
let node = render({ root: item, registry: registry, });
window.document.body.appendChild(node);
hook(item, (item) => {
    console.log('Re-rendering...');
    let oldNode = registry.get(item.key);
    let newNode = render({ root: item, registry: registry, });
    // TODO: Ensure `oldNode` is a `ChildNode`.
    oldNode.replaceWith(newNode);
});
setInterval(() => {
    planet.value = planet.value === "Earth" ? "Mars" : "Earth";
    style.value = style.value === "color: red;" ? "color: green;" : "color: red;";
}, 1000);
