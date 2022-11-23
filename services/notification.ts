import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { IBlogPost } from "../interface/blog";

export async function schedulePushNotification(blog: IBlogPost) {
  let id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "You haven't finished reading this article!",
      body: blog.title,
      data: { data: blog },
    },
    trigger: { hour: 3, repeats: true },
  });

  return id;
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus, ios: iosStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    let finalIosStatus = iosStatus;
    if (
      existingStatus !== "granted" ||
      (iosStatus &&
        iosStatus.status === Notifications.IosAuthorizationStatus.PROVISIONAL)
    ) {
      const { status, ios } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      finalIosStatus = ios;
    }
    if (
      finalStatus !== "granted" ||
      (finalIosStatus &&
        finalIosStatus.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL)
    ) {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);
  } else {
    alert("Physical device needed for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2596be",
    });
  }

  return token;
}

export async function cancelNotification(notifId: string) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
