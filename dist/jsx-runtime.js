import { Item } from '#~/item';
export class Fragment {
    symbol = Symbol('');
    of(config) {
        return new Item(this.symbol, config);
    }
    ;
}
;
export function jsx(type, config) {
    return (new type()).of(config);
}
;
export function jsxs(type, config) {
    let children = [];
    for (const child of config.children) {
        if (child instanceof Item) {
            children.push(child);
            continue;
        }
        ;
        children.push(jsx(Fragment, { children: [child], })); // Cast to `unknown` should not be required here.
    }
    ;
    return (new type()).of({
        ...config,
        children,
    });
}
;
export var JSX;
(function (JSX) {
    ;
})(JSX || (JSX = {}));
;
