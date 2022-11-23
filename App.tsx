import "react-native-gesture-handler";
import { Image, SafeAreaView, View } from "react-native";
import * as Font from "expo-font";
import { AppNavigator } from "./navigation";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "./context/theme";
import data from "./data/blogData.json";
import { IBlogPost } from "./interface/blog";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef, useCallback, FC } from "react";
import { Loader } from "./components/Loader";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function cacheImages(images: string[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = Font.useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    _loadAssetsAsync();
  }, []);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      ...(data as any).blogs
        .map((post: IBlogPost) => post.imageUrl)
        .slice(0, 10),
    ]);

    await Promise.all([...imageAssets]);
    setIsReady(true);
  };

  if (!isReady || !loaded) {
    //return <Loader />;
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;

const AlertContainer: FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </>
  );
};
