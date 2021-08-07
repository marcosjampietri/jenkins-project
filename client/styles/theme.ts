export type ThemeType = typeof light; // This is the type definition for my theme object.

export const light = {
  primary: "#f45511",
  text: "#000",
  background: "#fff",
};

export const dark: ThemeType = {
  primary: "#f45581",
  text: "#000",
  background: "#fff",
};

const theme = light; // set the light theme as the default.
export default theme;
