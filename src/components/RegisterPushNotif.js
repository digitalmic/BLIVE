import { AsyncStorage, Platform } from 'react-native';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';

const PUSH_ENDPOINT = 'https://blive.billionaires.id/mobilemodule/registertokenapp';

export default async function registerPushNotif() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // let token = await Notifications.getExpoPushTokenAsync();
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('This token App ' + token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    try {
      await AsyncStorage.setItem('tokenNotifExpo', token);
    } catch (error) {
      console.log(error);
    }

    let bodyFormData = new FormData();
    bodyFormData.append('token', token);

    axios({
      method: 'post',
      url: PUSH_ENDPOINT,
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return token;

  } else {
    alert('Must use physical device for Push Notifications');
    return;
  }
}
