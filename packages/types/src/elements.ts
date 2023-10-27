export interface LezzformElement {
  id: string;
  name: string;
  label?: string;
  type: LezzformElementType;
  category: LezzformElementCategory;
  validator: string;
}

export enum LezzformElementType {
  SingleLineText = "SingleLineText",
  TextArea = "TextArea",
  TwoColumn = "TwoColumn",
  ThreeColumn = "ThreeColumn",
}

export enum LezzformElementCategory {
  Input = "Input",
  UserInterface = "UserInterface",
}
