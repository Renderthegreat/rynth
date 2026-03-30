import { Component, } from '#~/index';
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement HTMLButtonElement}.
 */
export class Button {
    symbol = Symbol('button');
    of(config) {
        const component = new Component(this.symbol, config);
        // Attach the click listener directly to the rendered button element
        // to avoid nested bridge/event-target issues.
        component.lifecycle.on('mount', ({ node, }) => {
            const buttonElement = node;
            buttonElement.addEventListener('click', () => {
                config.click?.();
            });
        });
        return component;
    }
    ;
}
;
