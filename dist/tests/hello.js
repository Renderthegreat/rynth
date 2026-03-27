import { jsxs as _jsxs, jsx as _jsx } from "rynth/jsx-runtime";
import { Signal, } from '#~/signal';
import { render, If, Div, Button, } from '#~/html';
import { hook, } from '#~/hook';
const planet = new Signal("Earth");
const style = new Signal("color: green;");
const rickrolled = new Signal(false);
const component = _jsxs(Div, { children: [_jsxs(Div, { id: 'foo', style: style, children: ["Hello, ", planet, "!"] }), _jsx(Button, { click: () => {
                console.log("Never gonna give you up...");
                rickrolled.value = true;
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            }, children: "Click here" }), _jsxs(If, { condition: rickrolled, children: [_jsx(Div, { children: "Rickrolled!" }), _jsx(Button, { click: () => {
                        console.log("Never gonna let you down...");
                        rickrolled.value = false;
                    }, children: "Close" })] })] });
const registry = new Map();
let node = render({ root: component, registry: registry, });
hook(component, (component) => {
    // console.log(registry.size);
    // console.log("Re-rendering...");
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
