export type ThemeType = typeof dark; // This is the type definition for my theme object.

export const dark = {
    primary: "#f45511",
    text: "#000",
    background: "#fff",
};

export const light: ThemeType = {
    primary: "#f45581",
    text: "#000",
    background: "#fff",
};

const theme = dark; // set the dark theme as the default.
export default theme;
