import { Component, } from '#~/component';
export class Fragment {
    symbol = Symbol('');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
export function jsx(type, config) {
    const children = (config.children instanceof Array ? config.children : [config.children]);
    console.log(config, children);
    return (new type()).of({
        ...config,
        children: children,
    });
}
;
export function jsxs(type, config) {
    let children = [];
    for (const child of config.children) {
        if (child instanceof Component) {
            children.push(child);
            continue;
        }
        ;
        children.push(jsx(Fragment, { children: [child], }));
    }
    ;
    return (new type()).of({
        ...config,
        children: children,
    });
}
;
export var JSX;
(function (JSX) {
    ;
})(JSX || (JSX = {}));
;
