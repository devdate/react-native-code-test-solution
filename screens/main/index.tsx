import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainStackProps } from "./types";
import { TouchableOpacity, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { Home } from "./home";
import { Blog } from "./blog";
import { useTheme } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const Stack = createSharedElementStackNavigator<MainStackProps>();

export const MainNavigator = () => {
  const theme = useTheme();
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <>
      <Stack.Navigator initialRouteName={"home"}>
        <Stack.Screen
          name={"home"}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={"blog"}
          component={Blog}
          //   sharedElements={(route, otherRoute, showing) => {
          //     const { title, datePublished, imageUrl, author } =
          //       route.params.data;
          //     return [
          //       {
          //         id: `item.${title}.${datePublished}`,
          //         animation: "move",
          //         resize: "clip",
          //       },
          //       {
          //         id: `item.${imageUrl}.${datePublished}.${author}`,
          //         animation: "move",
          //         resize: "clip",
          //       },
          //     ];
          //   }}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: theme["background"],
            },
            cardStyleInterpolator: forFade,
            title: "blog",
            headerLeft: () => (
              <>
                <View style={{ marginLeft: RFValue(20) }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Main", { screen: "home" })
                    }
                  >
                    <Ionicons
                      name={"ios-arrow-back"}
                      size={RFValue(25)}
                      color={theme["background-alternative"]}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};
