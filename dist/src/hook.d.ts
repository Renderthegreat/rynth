import { Component } from '#~/component';
import { Signal } from '#~/signal';
export declare function hook(root: Component, callback: (component: Component, signal?: Signal<unknown>) => void): void;
