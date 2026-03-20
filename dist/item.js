export class Item {
    type;
    config;
    key = Symbol('Item.key');
    constructor(type, config) {
        this.type = type;
        this.config = config;
    }
    ;
}
;
;
