import { ITheme } from "../interface/theme";

const lightTheme = {
  background: "#fff",
  "background-alternative": "#000",
};
const darkTheme = {
  background: "#000",
  "background-alternative": "#fff",
};

export const theme = (theme: ITheme) =>
  theme === "dark" ? darkTheme : lightTheme;
