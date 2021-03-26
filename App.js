import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NotifService from './NotifService';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegister, setFcmRegister] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegister(true);
  };

  const onNotif = notif => {
    // Alert.alert(notif.title, notif.message);
    if (notif.userInteraction === false) {
      console.log('push notif');
      PushNotification.localNotification(notif);
    }
  };

  const notif = new NotifService(onRegister, onNotif);

  const handlePerm = perms => {
    Alert.alert('Permission', JSON.stringify(perms));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example app react native push notification
      </Text>
      <View style={styles.spacer} />
      <TextInput
        style={styles.textField}
        value={registerToken}
        placeholder="Register token"
      />
      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif();
        }}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif('sample.mp3');
        }}>
        <Text>Local Notification with sound (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif();
        }}>
        <Text>ScheduleNotif Notification in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif('sample.mp3');
        }}>
        <Text>ScheduleNotif Notification with sound in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelNotif();
        }}>
        <Text>Cancel last notification (if any)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelAll();
        }}>
        <Text>Cancel all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.checkPermission(handlePerm());
        }}>
        <Text>Check Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.requestPermissions();
        }}>
        <Text>Request Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.abandonPermissions();
        }}>
        <Text>Abandon Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getScheduledLocalNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console log Schedule Local Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getDeliveredNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console log Delivered Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.createOrUpdateChannel();
        }}>
        <Text>Create or update channel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.popInitialNotification();
        }}>
        <Text>popInitialNotification</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {fcmRegister && <Text>FCM Configured !</Text>}

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
