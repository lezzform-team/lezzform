export const rem = (strings: TemplateStringsArray): number => {
  const rootFontSize = 16;
  const remValue = parseFloat(strings[0]); // Extract the value from the template literal
  return remValue * rootFontSize;
};
