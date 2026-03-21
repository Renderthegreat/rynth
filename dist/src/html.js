import { Component, } from '#~/component';
import { Signal, } from '#~/signal';
/**
 * Renders a given component tree into a DOM node.
 *
 * This function takes a component tree rooted at `root` and renders it into a
 * DOM node. It also populates a registry mapping component keys to their
 * respective DOM nodes for future re-renders.
 *
 * @returns The rendered DOM node.
 */
export function render({ root, registry, }) {
    const rawChildren = root.config.children;
    const children = Array.isArray(rawChildren) ? rawChildren : (rawChildren === undefined ? [] : [rawChildren]);
    const isFragment = root.type.description === '';
    // Helper to attach attributes when we have an element node.
    const applyAttributes = (node) => {
        for (const key of Object.keys(root.config)) {
            if (key === 'children')
                continue;
            const attrKey = key;
            const value = root.config[attrKey];
            if (node instanceof HTMLElement) {
                if (value == null) {
                    node.removeAttribute(String(attrKey));
                }
                else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    node.setAttribute(String(attrKey), String(value));
                }
                else {
                    node.setAttribute(String(attrKey), String(value));
                }
                ;
            }
            ;
        }
        ;
    };
    if (isFragment) {
        if (children.length === 0) {
            const empty = window.document.createTextNode('');
            registry.set(root.key, empty);
            return empty;
        }
        ;
        if (children.length === 1) {
            const child = children[0];
            if (child instanceof Component) {
                const childNode = render({ root: child, registry });
                registry.set(root.key, childNode);
                return childNode;
            }
            ;
            if (child instanceof Signal) {
                const text = window.document.createTextNode(String(child.value));
                child.listener = (v) => { text.textContent = String(v); };
                registry.set(root.key, text);
                return text;
            }
            ;
            if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
                const text = window.document.createTextNode(String(child));
                registry.set(root.key, text);
                return text;
            }
            ;
        }
        ;
        const frag = window.document.createDocumentFragment();
        let firstAppended = null;
        for (const child of children) {
            let appended = null;
            if (child instanceof Component) {
                appended = render({ root: child, registry });
                frag.appendChild(appended);
            }
            else if (child instanceof Signal) {
                const text = window.document.createTextNode(String(child.value));
                child.listener = (v) => { text.textContent = String(v); };
                frag.appendChild(text);
                appended = text;
            }
            else if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
                const text = window.document.createTextNode(String(child));
                frag.appendChild(text);
                appended = text;
            }
            ;
            if (!firstAppended && appended)
                firstAppended = appended;
        }
        ;
        if (firstAppended)
            registry.set(root.key, firstAppended);
        return frag;
    }
    ;
    const node = window.document.createElement(root.type.description);
    registry.set(root.key, node);
    applyAttributes(node);
    for (const child of children) {
        if (child instanceof Component) {
            node.appendChild(render({ root: child, registry }));
            continue;
        }
        ;
        if (child instanceof Signal) {
            const text = window.document.createTextNode(String(child.value));
            child.listener = (v) => { text.textContent = String(v); };
            node.appendChild(text);
            continue;
        }
        ;
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
            node.appendChild(window.document.createTextNode(String(child)));
            continue;
        }
        ;
    }
    ;
    return node;
}
;
export class Div {
    symbol = Symbol('Div');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
export class Button {
    symbol = Symbol('Button');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
