import { Text, useTheme } from "@ui-kitten/components";
import React, { FC, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedView } from "../../../components/View";
import {
  cancelNotification,
  schedulePushNotification,
} from "../../../services/notification";
import { getData, storeData } from "../../../services/store";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { SharedElement } from "react-navigation-shared-element";

export const Blog: FC<any> = ({ route, navigation }) => {
  const theme = useTheme();
  const [readPerentage, setReadPerentage] = useState<number>(0);
  const formattedDate = dayjs(route.params.data.datePublished).format(
    "D MMM, YYYY"
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      if (readPerentage < 0.7) {
        let getNotif = await getData(route.params.data.title);
        if (!getNotif) {
          let notifId = await schedulePushNotification(route.params.data);
          await storeData(notifId, route.params.data.title);
        }
      } else {
        let getNotif = await getData(route.params.data.title);
        if (getNotif) {
          cancelNotification(getNotif);
        }
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme["background"] }}>
        <ThemedView style={{ flex: 1 }}>
          <ScrollView
            onScroll={({
              nativeEvent,
            }: {
              nativeEvent: {
                contentOffset: { y: number };
                contentSize: { height: number };
              };
            }) => {
              const { contentOffset, contentSize } = nativeEvent;
              const { height } = contentSize;
              const { y } = contentOffset;
              const position = y / height;
              setReadPerentage((prev) => (prev > position ? prev : position));
            }}
          >
            <View style={{ padding: RFValue(20) }}>
              <Text category="h1" style={styles.title}>
                {`${route.params.data.title[0].toUpperCase()}${route.params.data.title.slice(
                  1
                )}`}
              </Text>

              <View style={{ marginTop: RFValue(10) }}>
                <View style={styles.container}>
                  <Image
                    source={{ uri: route.params.data.imageUrl }}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </View>
                <View style={styles.extraInfo}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="ios-eye-outline" size={RFValue(15)} />
                    <Text category="h4" style={{ marginLeft: 4 }}>
                      {route.params.data.views}
                    </Text>
                  </View>
                  <Text category="h4">{formattedDate}</Text>
                </View>
                <Text category="s1" style={styles.description}>
                  {" "}
                  {route.params.data.content}
                </Text>
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: RFValue(170),
    width: "100%",
    marginBottom: RFValue(15),
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  innerContainer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(7),
    borderRadius: 20,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  description: {
    fontSize: RFValue(14),
    lineHeight: 20,
  },
});
