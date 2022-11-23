//import "react-native-gesture-handler";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import { ITheme } from "../interface/theme";
import { getData, storeData } from "../services/store";
import { THEME_MANAGER } from "../constants";
import { theme as appTheme } from "../constants/theme";

interface Props {
  children: any;
}

const ThemeContext = createContext<{
  theme: ITheme;
  handleThemeSwitch: () => void;
}>({ theme: "light", handleThemeSwitch: () => {} });

export const ThemeProvider: FC<Props> = (props) => {
  const [theme, setTheme] = useState<ITheme>("light");

  useEffect(() => {
    const getTheme = async () => {
      let themeFromStorage = await getData(THEME_MANAGER);
      if (themeFromStorage) setTheme(JSON.parse(themeFromStorage) as ITheme);
      else setTheme(Appearance.getColorScheme() as ITheme);
    };
    getTheme();
  }, []);

  //console.log(Appearance.getColorScheme());

  const handleThemeSwitch = async () => {
    //console.log("clicked");
    if (theme === "light") {
      setTheme("dark");
      await storeData("dark", THEME_MANAGER);
    } else {
      setTheme("light");
      await storeData("light", THEME_MANAGER);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
      <ApplicationProvider
        {...eva}
        theme={
          theme === "light"
            ? { ...eva.light, ...appTheme(theme) }
            : { ...eva.dark, ...appTheme(theme) }
        }
        customMapping={{
          ...eva.mapping,
          strict: {
            "text-font-family": "Roboto",

            "text-heading-1-font-size": 30,
            "text-heading-1-font-weight": "700",
            "text-heading-1-font-family": "Roboto-Bold",
          },
        }}
      >
        {props.children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
