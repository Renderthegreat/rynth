import { EventEmitter, } from 'eventemitter3';
export class Lifecycle extends EventEmitter {
    methods;
    cleanupTasks = [];
    addCleanupTask(task) {
        this.cleanupTasks.push(task);
    }
    ;
    cleanup() {
        this.cleanupTasks.forEach(task => task());
        this.cleanupTasks = [];
    }
    ;
    constructor(methods) {
        super();
        this.methods = methods;
    }
    ;
    emit(event, ...args) {
        this.methods[event]?.();
        super.emit(event, ...args);
        return true;
    }
    ;
}
;
