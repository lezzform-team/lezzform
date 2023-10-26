export interface LezzformElement {
    id: string;
    name: string;
    label?: string;
    type: LezzformElementType;
    validator: string;
}
export declare enum LezzformElementType {
    SingleLineText = "SingleLineText",
    TextArea = "TextArea"
}
