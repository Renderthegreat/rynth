import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLBRElement HTMLBRElement}.
 */
export class Break {
    symbol = Symbol('br');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
