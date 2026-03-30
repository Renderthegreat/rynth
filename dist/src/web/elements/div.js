import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement HTMLDivElement}.
 */
export class Div {
    symbol = Symbol('div');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
