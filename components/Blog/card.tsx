import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { useThemeProvider } from "../../context/theme";
import FastImage from "react-native-fast-image";
import { RFValue } from "react-native-responsive-fontsize";
import { MotiView, useDynamicAnimation } from "moti";
import { IBlogPost } from "../../interface/blog";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { SharedElement } from "react-navigation-shared-element";

interface Props {
  data: IBlogPost;
  onPress: () => void;
}

export const BlogPostCard: FC<Props> = ({ data, onPress }) => {
  const formattedDate = dayjs(data.datePublished).format("MMM D");
  const { theme } = useThemeProvider();

  //trying to implement Moti to animate Cards in transition
  const dimentions = useWindowDimensions();

  const animation = useDynamicAnimation(() => {
    return {
      height: 200,
      scale: 1,
      zIndex: 1,
    };
  });

  //trying to implement Moti to animate Cards in transition

  const onPressExpand = () => {
    animation.animateTo({
      height: dimentions.height,
      width: dimentions.width,
      position: "absolute",
      zIndex: 999,
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "-50%",
    });
    console.log(dimentions.height);

    //onPress()
  };

  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={{ uri: data.imageUrl }}
            style={{
              flex: 1,
              borderRadius: 20,
              height: "100%",
              width: "100%",
            }}
          />

          <View style={styles.innerContainer}>
            <Text
              style={styles.title}
            >{`${data.title[0].toUpperCase()}${data.title.slice(1)}`}</Text>

            <View style={styles.viewContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-eye-outline"
                  color="white"
                  size={RFValue(15)}
                />
                <Text style={styles.view}>{data.views}</Text>
              </View>
              <Text style={styles.view}>{formattedDate}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: RFValue(200),
    width: RFValue(150),
    marginHorizontal: RFValue(7),
    marginBottom: RFValue(15),
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  textContainer: {
    backgroundColor: "#ffffff99",
    borderRadius: 999,
    //position: "absolute",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(13),
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
    color: "#fff",
  },
  view: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },
  innerContainer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(7),
    borderRadius: 20,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
