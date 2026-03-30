import { cloneDeep, } from 'lodash-es';

import { Component, ComponentFactory, ComponentConfig, Signal, } from '#~/index';

export type IfAttributes = {
	condition: Signal<boolean>;
};
export class If implements ComponentFactory<IfAttributes> {
	public readonly symbol: symbol = Symbol('If');

	public of(config: ComponentConfig<IfAttributes>): Component<IfAttributes> {
		const conditionSignal: Signal<boolean> = config.condition;
		const componentSignal: Signal<Component | null> = new Signal<Component | null>(null);

		// Ensure we don't destroy the real `config` on unmount.
		const getNewConfig: () => ComponentConfig<IfAttributes> = () => {
			return cloneDeep(config);
		};

		const wrapper: Component<IfAttributes> = new Component<IfAttributes>(this.symbol, {
			...config,
			children: [
				componentSignal
			],
		});

		// Subscribe to the condition signal and update the inner component.
		const unsubscribe = conditionSignal.subscribe((value: boolean) => {
			if (value) {
				componentSignal.value = new Component(Symbol(''), getNewConfig());
			} else {
				componentSignal.value?.lifecycle.emit('unmount');
				componentSignal.value = null;
			};
		});

		wrapper.lifecycle.addCleanupTask(unsubscribe);

		// Initialize based on current value.
		if (conditionSignal.value) {
			componentSignal.value = new Component(Symbol(''), getNewConfig());
		};

		return wrapper;
	};
};