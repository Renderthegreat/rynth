import { cloneDeep, } from 'lodash-es';
import { Component, Signal, } from '#~/index';
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
            ...config,
            children: [
                componentSignal
            ],
        });
        // Subscribe to the condition signal and update the inner component.
        const unsubscribe = conditionSignal.subscribe((value) => {
            if (value) {
                componentSignal.value = new Component(Symbol(''), getNewConfig());
            }
            else {
                componentSignal.value?.lifecycle.emit('unmount');
                componentSignal.value = null;
            }
            ;
        });
        wrapper.lifecycle.addCleanupTask(unsubscribe);
        // Initialize based on current value.
        if (conditionSignal.value) {
            componentSignal.value = new Component(Symbol(''), getNewConfig());
        }
        ;
        return wrapper;
    }
    ;
}
;
