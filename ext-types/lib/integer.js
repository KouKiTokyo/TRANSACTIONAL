import { NumericType } from "type-r";
export function Integer(x) {
    return x ? Math.round(x) : 0;
}
Integer._attribute = NumericType;
//# sourceMappingURL=integer.js.map