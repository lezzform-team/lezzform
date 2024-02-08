export type GeneralStyleMetadata<
  Values = Record<string, StyleMetadataValues>,
  Schema = Record<keyof Values, StyleMetadataSchema>,
> = {
  values: Partial<GeneralStyleMetadataValuesType & Values>;
  schema: Partial<GeneralStyleMetadataSchemaType & Schema>;
};

export type GeneralStyleMetadataValuesType = {
  root: Record<string, string>;
};

export type GeneralStyleMetadataSchemaType = { root: StyleMetadataValues };

export type StyleMetadataValues = Partial<
  Record<keyof StyleMetadataSchema, unknown>
> &
  Record<string, unknown>;

export type StyleMetadataSchema = {
  display?: {
    title: "Display Mode";
    type: "string";
  };
  gridColumn?: {
    title: "Grid Column";
    type: "string";
  };
  gridTemplateColumns?: {
    title: "Column";
    type: "string";
  };
  gap?: {
    title: "Gap";
    type: "integer";
  };
  height?: {
    title: "Height";
    type: "string";
  };
  width?: {
    title: "Width";
    type: "string";
  };
  fontSize?: {
    title: "Font Size";
    type: "integer";
  };
  fontWeight?: {
    title: "Font Weight";
    type: "string";
  };
  color?: {
    title: "Text Color";
    type: "string";
  };
  backgroundColor?: {
    title: "Background Color";
    type: "string";
  };
  opacity?: {
    title: "Opacity";
    type: "string";
  };
  objectFit?: {
    title: "Object Fit";
    type: "string";
  };
  alignItems?: {
    title: "Align Items";
    type: "string";
  };
  justifyContent?: {
    title: "Justify Content";
    type: "string";
  };
  borderWidth?: {
    title: "Border Width";
    type: "string";
  };
  borderColor?: {
    title: "Border Color";
    type: "string";
  };
  borderStyle?: {
    title: "Border Style";
    type: "string";
  };
};
