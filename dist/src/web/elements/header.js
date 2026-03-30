import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header HTMLHeaderElement}.
 */
export class Header {
    symbol = Symbol('header');
    of(config) {
        return new Component(this.symbol, config);
    }
    ;
}
;
