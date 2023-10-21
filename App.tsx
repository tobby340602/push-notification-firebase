import React, { useEffect } from 'react';
import {AppRegistry, PermissionsAndroid, View, Text, Button} from 'react-native';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App(): JSX.Element {
  useEffect(() => {
    // initializeApp();
    _initiation();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const _initiation = async ()=>{
    await messaging().registerDeviceForRemoteMessages();
  // Get the token
    const token = await messaging().getToken();
    console.log(token);
  // Send request to permissions for post_notification
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if(result){
      console.log("Notification is available!");
    }else{
      console.log("Notification is not available!");
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {    
      console.log('Message handled in the background!', remoteMessage);
    });
    AppRegistry.registerComponent('app', () => App);
  }
// Show test alert
  const _sendNotificaion = async ()=>{
    Alert.alert('Alert', 'Sent notification');
    //const tokens = await getTokensFromDatastore();

    // Send a message to devices with the registered tokens
    // await admin.messaging().sendMulticast({
    //   tokens: ['ff7NCL5xT2CsARcrtrUqYM:APA91bEwgGwbWCQxhHcGfVjiWeviN8lMt25gRnyWtZBIRxx9qqnYYNi99Tg6hlGt5icr0ErEZHg49CG9ZCexkRSXxK7EScUIQHlmWbZMmWOk9l5oFHKXoH_xJ_rq0RXL9hKIAWkxvgPt'],// ['token_1', 'token_2', ...]
    //   data: { hello: 'world!' },
    // });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent : 'center'}}>
      <Text>Push and receive notification via Firebase.</Text>
      <View style={{ marginVertical: 10}}/>
      <Button title='SEND NOTIFICATION' onPress={_sendNotificaion}/>
    </View>
  );
}

export default App;