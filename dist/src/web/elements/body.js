import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement HTMLBodyElement}.
 */
export class Body {
    symbol = Symbol('body');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
