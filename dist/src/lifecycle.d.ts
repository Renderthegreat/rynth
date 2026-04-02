import { EventEmitter } from 'eventemitter3';
export type LifecycleEvent = 'mount' | 'unmount' | 'dispose';
export type LifecycleMethods = {
    [key in LifecycleEvent]?: () => void;
};
export declare class Lifecycle extends EventEmitter<LifecycleEvent> {
    private readonly methods;
    private cleanupTasks;
    addCleanupTask(task: () => void): void;
    cleanup(): void;
    constructor(methods: LifecycleMethods);
    emit(event: LifecycleEvent, ...args: any): boolean;
}
