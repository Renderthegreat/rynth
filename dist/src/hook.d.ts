import { Component } from '#~/component.ts';
import { Signal } from '#~/signal.ts';
export declare function hook(root: Component, callback: (component: Component, signal?: Signal<unknown>) => void): void;
