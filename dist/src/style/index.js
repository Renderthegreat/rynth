import { toCSS, } from "#~/style/toCSS";
export class Style {
    createVariable;
    foreground;
    background;
    font;
    constructor(createVariable) {
        this.createVariable = createVariable;
    }
    ;
    toCSS() {
        return toCSS(this);
    }
    ;
}
;
export class StyleSheet {
    variables = new Map();
    createStyle() {
        return new Style((value) => {
            const UUID = crypto.randomUUID();
            this.variables.set(UUID, value);
            return {
                value: `var(--${UUID})`,
                name: UUID,
            };
        });
    }
    ;
}
;
export * from '#~/style/fill';
export * from '#~/style/font';
