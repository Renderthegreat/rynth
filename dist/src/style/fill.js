export var FillType;
(function (FillType) {
    FillType[FillType["Color"] = 0] = "Color";
    FillType[FillType["Gradient"] = 1] = "Gradient";
    FillType[FillType["Image"] = 2] = "Image";
})(FillType || (FillType = {}));
;
export var GradientType;
(function (GradientType) {
    GradientType[GradientType["Linear"] = 0] = "Linear";
    GradientType[GradientType["Radial"] = 1] = "Radial";
    GradientType[GradientType["Stop"] = 2] = "Stop";
})(GradientType || (GradientType = {}));
;
// 
/**
 * TODO: Document.
 */
export class Gradient {
    data;
    constructor(data) {
        this.data = data;
    }
    ;
    toString() {
        switch (this.data.kind) {
            case GradientType.Linear:
                {
                    return `linear-gradient(${this.data.value.map((color) => color.toString()).join(', ')})`;
                }
                ;
            case GradientType.Radial:
                {
                    return `radial-gradient(${this.data.value.map((color) => color.toString()).join(', ')})`;
                }
                ;
            case GradientType.Stop:
                {
                    return `linear-gradient(${this.data.value.map(([stop, color]) => `${stop * 100}% ${color.toString()}`).join(', ')})`;
                }
                ;
            // All types are exhausted, so no `default` block is required.
        }
        ;
    }
    ;
}
;
export class Image {
    source;
    constructor(source) {
        this.source = source;
    }
    ;
    toString() {
        return `url(${this.source})`;
    }
    ;
}
;
