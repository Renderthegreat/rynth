import { Item, } from '#~/item';
import { Signal, } from '#~/signal';
export function hook(root, callback) {
    for (const child of root.config.children) {
        if (child instanceof Item) {
            hook(child, callback);
            continue;
        }
        ;
        if (child instanceof Signal) {
            child.listener = () => {
                callback(root, child);
            };
            continue;
        }
        ;
    }
    ;
    for (const [key, value] of Object.entries(root.config)) {
        // Not necessary, but to make the code more readable.
        if (key === 'children') {
            continue;
        }
        ;
        if (value instanceof Signal) {
            value.listener = () => {
                callback(root, value);
            };
            continue;
        }
        ;
    }
    ;
}
;
