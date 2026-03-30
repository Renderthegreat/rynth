import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement HTMLHeadElement}.
 */
export class Head {
    symbol = Symbol('head');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
