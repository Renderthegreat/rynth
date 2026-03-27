import { jsx as _jsx } from "rynth/jsx-runtime";
import { cloneDeep, } from 'lodash-es';
import { Component, } from '#~/component';
import { Signal, } from '#~/signal';
/**
 * Resolves a single child ({@link Component}, {@link Signal}, or primitive) into a physical DOM Node.
 */
function resolveChild({ child, registry, root, }) {
    if (child instanceof Component) {
        return render({ root: child, registry });
    }
    ;
    if (child instanceof Signal) {
        // We always return a stable Node (either the initial rendered node
        // or a placeholder) so that future updates can replace it in-place.
        const placeholder = window.document.createComment('signal');
        let currentNode = null;
        let lastValue = child.value;
        const mountForValue = (value) => {
            if (value instanceof Component) {
                return render({ root: value, registry });
            }
            ;
            if (value === null) {
                return null;
            }
            ;
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return window.document.createTextNode(String(value));
            }
            ;
            return null;
        };
        // Initialize current node (or use placeholder if nothing to render yet).
        currentNode = mountForValue(lastValue);
        const nodeToReturn = currentNode ?? placeholder;
        // Subscribe to future updates and swap nodes in the DOM as needed.
        const unsubscribe = child.subscribe((value) => {
            if (value === lastValue)
                return;
            const previous = lastValue;
            lastValue = value;
            // If the previous value was a Component, emit unmount so it can cleanup.
            if (previous instanceof Component) {
                previous.lifecycle.emit('unmount');
                registry.delete(previous.key);
            }
            ;
            const newNode = mountForValue(value);
            if (newNode) {
                // Insert or replace in DOM.
                if (currentNode) {
                    currentNode.replaceWith(newNode);
                }
                else {
                    placeholder.replaceWith(newNode);
                }
                ;
                currentNode = newNode;
            }
            else {
                // New value is null — remove current node and restore placeholder.
                if (currentNode) {
                    currentNode.replaceWith(placeholder);
                    currentNode = null;
                }
                ;
            }
            ;
        });
        root.lifecycle.addCleanupTask(unsubscribe);
        return nodeToReturn;
    }
    ;
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        return window.document.createTextNode(String(child));
    }
    ;
    return null;
}
;
/**
 * Renders a given component tree into a DOM node.
 */
export function render({ root, registry, }) {
    const isFragment = root.type.description === '';
    // ==========================================
    // HANDLE FRAGMENTS.
    // ==========================================
    if (isFragment) {
        if (root.config.children.length === 0) {
            const empty = window.document.createTextNode('');
            registry.set(root.key, empty);
            return empty;
        }
        ;
        const fragment = window.document.createDocumentFragment();
        let firstNode = null;
        for (const child of root.config.children) {
            const childNode = resolveChild({ child, registry, root, });
            if (childNode) {
                fragment.appendChild(childNode);
                if (!firstNode) {
                    firstNode = childNode;
                }
                ; // Track the first one for the registry.
            }
            ;
        }
        ;
        if (firstNode) {
            registry.set(root.key, firstNode);
        }
        ;
        // HACK(+): If there's only 1 child, just return it directly to avoid the Fragment wrapper.
        return root.config.children.length === 1 && firstNode ? firstNode : fragment;
    }
    ;
    // ==========================================
    // HANDLE STANDARD ELEMENTS.
    // ==========================================
    const node = window.document.createElement(root.type.description);
    registry.set(root.key, node);
    // Apply attributes gracefully.
    for (const [key, value] of Object.entries(root.config)) {
        if (key === 'children') {
            continue;
        }
        ;
        // Support reactive attribute values via `Signal`.
        if (value instanceof Signal) {
            const v = value.value;
            if (v == null) {
                node.removeAttribute(key);
            }
            else {
                node.setAttribute(key, String(v));
            }
            const unsubscribeAttr = value.subscribe((nv) => {
                if (nv == null) {
                    node.removeAttribute(key);
                }
                else {
                    node.setAttribute(key, String(nv));
                }
                ;
            });
            root.lifecycle.addCleanupTask(unsubscribeAttr);
            continue;
        }
        ;
        if (value == null) {
            node.removeAttribute(key);
        }
        else {
            node.setAttribute(key, String(value));
        }
        ;
    }
    ;
    // Append all children using our modular helper.
    for (const child of root.config.children) {
        const childNode = resolveChild({ child, registry, root, });
        if (childNode) {
            node.appendChild(childNode);
        }
        ;
    }
    ;
    // Fire lifecycle hook.
    root.lifecycle.emit('mount', { node, });
    return node;
}
;
/**
 * This {@link Component} type acts as a bridge between the `JSX` runtime and the `DOM`.
 */
export class Bridge {
    symbol = Symbol('Bridge');
    of(config) {
        const uuid = crypto.randomUUID(); // These should never realistically conflict.
        config.id = uuid;
        const component = new Component(this.symbol, config);
        component.lifecycle.once('mount', ({ node, }) => {
            console.log('`Bridge` mounted...');
            // Prefer the immediate parent element where this bridge was mounted.
            // Fallback to `getRootNode()` if parent is unavailable.
            const parent = (node.parentNode ?? node.getRootNode());
            // Debug: indicate the bridge mounted and show parent info.
            try {
                console.debug('Bridge mounted for', config, 'parent:', parent?.nodeName || parent);
            }
            catch (e) {
                console.debug('Bridge mounted');
            }
            ;
            config.func(parent);
        });
        return component;
    }
    ;
}
;
export class If {
    symbol = Symbol('If');
    of(config) {
        const conditionSignal = config.condition;
        const componentSignal = new Signal(null);
        // Ensure we don't destroy the real `config` on unmount.
        const getNewConfig = () => {
            return cloneDeep(config);
        };
        const wrapper = new Component(this.symbol, {
            children: [componentSignal],
        });
        // Subscribe to the condition signal and update the inner component.
        const unsubscribe = conditionSignal.subscribe((v) => {
            console.debug('If condition changed:', v);
            if (v) {
                componentSignal.value = new Component(this.symbol, getNewConfig());
            }
            else {
                console.log("Unmounting...");
                componentSignal.value?.lifecycle.emit('unmount');
                componentSignal.value = null;
            }
            ;
        });
        wrapper.lifecycle.addCleanupTask(unsubscribe);
        // Initialize based on current value.
        if (conditionSignal.value) {
            componentSignal.value = new Component(this.symbol, getNewConfig());
        }
        ;
        return wrapper;
    }
    ;
}
;
export class Div {
    symbol = Symbol('div');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
export class Button {
    symbol = Symbol('button');
    of(config) {
        const component = new Component(this.symbol, config);
        const nested = _jsx(Bridge, { func: (parent) => {
                const button = parent;
                // Debug: log when adding click listener for this button.
                console.debug("Attaching click listener to", button?.nodeName || button);
                button.addEventListener('click', () => {
                    console.debug("Button clicked — invoking config.click...");
                    config.click?.();
                });
            } });
        nested.config.children = config.children;
        component.config.children = [nested];
        return component;
    }
    ;
}
;
