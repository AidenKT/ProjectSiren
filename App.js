import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Vibration,
} from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import * as WebBrowser from 'expo-web-browser';
import StopwatchTimer from 'react-native-animated-stopwatch-timer';

// You can import from local files
import SirenLogo from './components/logo.js';
import LanguageSelect from './components/language.js';
import RowSelect from './components/row.js';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

const rowLetter = 'A';

async function requestForegroundPermissionsAsync() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status;
}

function MainScreen({ navigation }) {
  requestForegroundPermissionsAsync();
  const [rowLetter, setRowLetter] = useState('A');
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <StatusBar style="light" />
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => {
            Alert.alert(
              '\n Project Siren Credits',
              '\n Software Lead \n Aiden Tabrizi \n \n Business Lead \n Keala Minna-Choe \n \n Hardware Lead \n Leo Tian \n \n Marketing Lead \n Kailani Minna-Choe \n \n Secretary \n Julia Aguirre \n \n Finance \n Aiden Tabrizi \n \n Advisor \n Dvora Celniker \n \n Hardware Team \n Leo Tian \n Kai Minna-Choe \n Keala Minna-Choe \n Alex Sellemi \n Jay Liang \n \n Software Team \n Aiden Tabrizi \n Kailani Minna-Choe \n Madison Mendoza \n \n Business Team \n Keala Minna-Choe \n Kailani Minna-Choe \n Leo Tian \n Aiden Tabrizi \n Shruti Malladi \n Madison Mendoza \n Julia Aguirre \n \n Localization \n Aiden Tabrizi - English \n Julia Aguirre - Spanish \n \n Special Thanks \n STEM Solutions for Tomorrow Club \n \n Made with ❤️ by Canyon Crest Academy Students in collaboration with San Diego MTS.',
              [{ text: 'Go Back', style: 'cancel' }]
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
          }}>
          <SirenLogo />
        </TouchableOpacity>

        <Text style={styles.title}>We're here to help.</Text>
        <Text style={styles.subtitle}>Select from several safety options.</Text>

        <TouchableOpacity
          style={styles.buttonBackgroundNotify}
          onPress={() => {
            navigation.navigate('WarningCountdown', {
              actionWarning: 'Notifying Transit Security in',
              type: 'transitNotify',
              row: rowLetter,
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }}
          activeOpacity={0.7}
          uppercase={false}
          mode="contained"
          accessibilityLabel="Notify Transit Security">
          <View style={styles.iconContainer}>
            <MaterialIcons name="phone" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.buttonWhite}>Notify Transit Security</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonBackgroundCall}
          onPress={() => {
            navigation.navigate('WarningCountdown', {
              actionWarning: 'Calling you in',
              type: 'fakeCall',
              row: rowLetter,
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }}
          labelStyle={{ color: 'black', fontWeight: 'bold' }}
          color="#3E68FF"
          activeOpacity={0.7}
          uppercase={false}
          icon="bell"
          mode="contained"
          accessibilityLabel="Receive Fake Phone Call">
          <View style={styles.iconContainer}>
            <MaterialIcons name="notifications" size={24} color="#00000" />
          </View>
          <Text style={styles.button}>Get a Fake Phone Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonBackgroundEmergency}
          onPress={() => {
            navigation.navigate('WarningCountdown', {
              actionWarning: 'Calling Emergency Services in',
              type: 'callEmergency',
              row: rowLetter,
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }}
          labelStyle={{ color: '#FF1616', fontWeight: 'bold' }}
          color="#3E68FF"
          activeOpacity={0.7}
          uppercase={false}
          icon="alert"
          mode="contained"
          accessibilityLabel="Call the Authorities">
          <View style={styles.iconContainer}>
            <MaterialIcons name="error" size={24} color="#FF1616" />
          </View>
          <Text style={styles.buttonRed}>Call the Authorities</Text>
        </TouchableOpacity>

        <View style={styles.icon}>
          <LanguageSelect />
        </View>

        <Text style={styles.terms}>
          You're in Row {rowLetter}.{' '}
          <View>
            <RowSelect rowLetter={rowLetter} setRowLetter={setRowLetter} />
          </View>
          {'\n'}
          <Text
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
              WebBrowser.openBrowserAsync('https://www.projectsiren.org/privacy');
            }}
            style={styles.underlineText}>
            Privacy Policy
          </Text>
          {'\n'}
          <Text
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
              WebBrowser.openBrowserAsync('https://www.projectsiren.org/terms');
            }}
            style={styles.underlineText}>
            Terms of Service
          </Text>
          {'\n'}© SIREN Project
        </Text>
      </View>
    </ActionSheetProvider>
  );
}

function NotificationConfirmation({ props, route, navigation }) {
  const { passedType, row } = route.params;

  let completedAction;
  let titleAction;
  //let warning

  if (passedType == 'fakeCallComplete') {
    titleAction = 'You ended the fake phone call';
    completedAction =
      'If the situation escalates, notify Transit Security or Emergency Sevices on the Home Screen.';
    prompt = 'Back to Home Screen';
    //warning = "It is illegal to make illegitimate calls to authorities.";
  }
  if (passedType == 'transitNotify') {
    titleAction = 'Help is on the way.';
    completedAction =
      "We've notified Transit Security with your location and audio information to assist you.";
    prompt = 'Back to Home Screen';
    //warning = "It is illegal to make illegitimate calls to authorities.";
  }
  if (passedType == 'callEmergency') {
    titleAction = 'Help is on the way.';
    completedAction =
      "We've notified Emergency Services and Transit Security with your location and audio information.";
    prompt = 'Back to Home Screen';
    //warning = "It is illegal to make illegitimate calls to authorities.";
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBar style="light" />
      <View style={styles.iconConfirm}>
        <MaterialIcons name="check-circle" size={128} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>{titleAction}</Text>
      <Text style={styles.subtitle}>{completedAction}</Text>

      <TouchableOpacity
        style={styles.backHomeButtonBackground}
        onPress={() => navigation.popToTop()}
        labelStyle={{ color: 'black', fontWeight: '500' }}
        color="#3E68FF"
        activeOpacity={0.7}
        uppercase={false}
        mode="contained"
        accessibilityLabel="Back to Home Screen.">
        <Text style={styles.button}>Back to Home Screen</Text>
      </TouchableOpacity>
      <Text style={styles.confirmTerms}>
        You're in Row {row}.{'\n'}
        <Text
          onPress={() => {
            alert(
              'In the future will link to real Privacy Policy. For now though, I collect your device statistics, identifiers, crash, and diagonstic reports, as well as additional information on your sessions. No location or audio information is currently being used, and all data collected is through TestFlight.'
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
          }}
          style={styles.underlineText}>
          Privacy Policy
        </Text>
        {'\n'}
        <Text
          onPress={() => {
            alert('This feature is coming soon. -Aiden :D');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
          }}
          style={styles.underlineText}>
          Terms of Service
        </Text>
        {'\n'}© SIREN Project
      </Text>
    </View>
  );
}

function AppleFakeCall({ route, navigation }) {
  const { row } = route.params;
  const backgroundImage = {
    uri: 'https://raw.githubusercontent.com/AidenKT/ProjectSiren/main/assets/iosBackground.png',
  };
  const [sound, setSound] = React.useState();

  const continueVibrate = React.useRef(true);

  async function vibrate() {
    console.log(continueVibrate.current);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Heavy);
    setTimeout(() => {
      Vibration.vibrate(3000);
    }, 300);

    setTimeout(() => {
      if (continueVibrate.current) {
        vibrate();
      }
    }, 1500);
  }

  async function playRingtone() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/fakeCallRingtone.mp3'),
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    setTimeout(() => {
      vibrate();
    }, 500);

    playRingtone();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleDeclinePress = () => {
    continueVibrate.current = false;
    navigation.navigate('NotificationConfirmation', {
      passedType: 'fakeCallComplete',
      row: row,
    });
    sound.unloadAsync();
  };

  const handleAcceptPress = () => {
    continueVibrate.current = false;
    navigation.navigate('AppleOnCall', {
      row: row,
    });
    sound.unloadAsync();
  };

  return (
    <View style={styles.callContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        blurRadius={50}
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(0,0,0, 0.35)' }}>
          <StatusBar barStyle="light-content" />
          <StatusBar style="light" />
          <View style={styles.iOSCallID}>
            <Text style={styles.iOSName}>Aiden</Text>
            <Text style={styles.iOSSubText}>mobile</Text>
          </View>
          <View style={styles.iOSSmallerOptions}>
            <Ionicons name="ios-alarm" size={22} color="white" />
            <Ionicons
              name="ios-chatbubble"
              style={{ marginLeft: '50.75%' }}
              size={22}
              color="white"
            />
          </View>
          <View style={styles.iOSSmallerOptionsText}>
            <Text style={{ color: 'white', fontSize: 12, margin: 0 }}>
              Remind Me
            </Text>

            <Text
              style={{
                marginLeft: '41%',
                color: 'white',
                fontSize: 12,
                margin: 0,
              }}>
              Message
            </Text>
          </View>
          <View style={styles.iOSOptions}>
            <TouchableOpacity
              style={styles.iOSDecline}
              accessibilityLabel="Decline the fake phone call."
              onPress={handleDeclinePress}>
              <Ionicons
                name="ios-call"
                style={{ transform: [{ rotate: '135deg' }] }}
                size={36}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iOSAccept}
              onPress={handleAcceptPress}
              accessibilityLabel="Accept the fake phone call.">
              <Ionicons name="ios-call" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.iOSOptionsText}>
            <Text style={{ color: 'white', fontSize: 12, margin: 0 }}>
              Decline
            </Text>

            <Text style={styles.iOSAcceptText}>Accept</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

global.__reanimatedWorkletInit = () => {};

function AppleOnCall({ props, route, navigation }) {
  const stopwatchRef = React.useRef(null);
  const { row } = route.params;
  const backgroundImage = {
    uri: 'https://raw.githubusercontent.com/AidenKT/ProjectSiren/main/assets/iosBackground.png',
  };

  React.useEffect(() => {
    stopwatchRef.current?.play();
  }, []);

  return (
    <View style={styles.callContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        blurRadius="50"
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(0,0,0, 0.35)', flex: '1' }}>
          <StatusBar barStyle="light-content" />
          <StatusBar style="light" />
          <View style={styles.iOSOnCallID}>
            <Text style={styles.iOSName}>Aiden</Text>
            <StopwatchTimer
              ref={stopwatchRef}
              containerStyle={{ justifyContent: 'center' }}
              digitStyle={styles.iOSSubText}
              textCharStyle={styles.iOSSubText}
              animationDuration={0}
              trailingZeros={0}
              leadingZeros={2}
            />
          </View>
          <View style={styles.iOSOnCallOptions}>
            <View style={styles.iOSOnCallOptionsR1}>
              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-mic-off" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>mute</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-apps" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>keypad</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-volume-high" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>audio</Text>
              </View>
            </View>

            <View style={styles.iOSOnCallOptionsR2}>
              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-add" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>add call</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-videocam" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>FaceTime</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons
                    name="ios-person-circle-outline"
                    size={36}
                    color="white"
                  />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>contacts</Text>
              </View>
            </View>
          </View>
          <View style={styles.iOSOptions}>
            <TouchableOpacity
              style={styles.iOSDecline}
              accessibilityLabel="Decline the fake phone call."
              onPress={() => {
                navigation.navigate('NotificationConfirmation', {
                  passedType: 'fakeCallComplete',
                  row: row,
                });
              }}>
              <Ionicons
                name="ios-call"
                style={{ transform: [{ rotate: '135deg' }] }}
                size={36}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function Countdown({ props, route, navigation }) {
  const { actionWarning, type, row } = route.params;
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef(time);
  const immediateNotify = () => {
    timerRef.current = 0;
    setTime(0);
  };

  let passingType;
  let action;
  let warning;

  if (type == 'transitNotify') {
    action =
      'Transit Security will be notified with information, such as your location and audio information, to best assist you.';
    warning = 'It is illegal to make illegitimate calls to authorities.';
    passingType = 'transitNotify';
  }
  if (type == 'callEmergency') {
    action =
      'Emergency Services (911) & Transit Security will be dialed with information, such as your location, to best help you.';
    warning = 'It is illegal to make illegitimate calls to authorities.';
    passingType = 'callEmergency';
  }
  if (type == 'fakeCall') {
    action = `You will receive a fake phone call from this application with a ringtone, "hang up" the call to end ringtone.`;
    warning = 'Ensure your ringer is turned on to hear the ringtone.';
    passingType = 'fakeCall';
  }

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (passingType != 'fakeCall') {
          navigation.navigate('NotificationConfirmation', {
            passedType: passingType,
            row: row,
          });
        } else if (passingType == 'fakeCall') {
          if (Device.brand == 'Apple') {
            navigation.navigate('AppleFakeCall', { row: row });
          } else {
            navigation.navigate('androidFakeCall');
          }
        }
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBar style="light" />
      <Text style={styles.title}>{actionWarning}</Text>
      <View style={styles.countdownCircle}>
        <Text style={styles.countdownTimer}>{time}</Text>
      </View>
      <Text style={styles.title}>seconds.</Text>
      <Text style={styles.subtitle}>{action}</Text>
      <TouchableOpacity activeOpacity={0.4} onPress={immediateNotify}>
        <Text style={styles.notifyImmediately}>Notify Immediately</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButtonBackground}
        onPress={() => navigation.goBack()}
        labelStyle={{ color: 'black', fontWeight: '500' }}
        color="#3E68FF"
        activeOpacity={0.7}
        uppercase={false}
        mode="contained"
        accessibilityLabel="Cancel">
        <Text style={styles.button}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>
        <Text>Entering sleep mode will interrupt the countdown.{'\n'}</Text>
        <Text>{warning}</Text>
        <Text>{'\n'}© SIREN Project</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#272727',
    padding: 8,
  },
  callContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },
  backgroundImage: {
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    margin: 12,
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  iOSName: {
    margin: 0,
    fontSize: 35,
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  },
  iOSSubText: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
    opacity: 0.5,
  },
  iOSOnCallButton: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.215,
    height: Dimensions.get('window').width * 0.215,
    backgroundColor: 'rgba(230,230,230,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    blurRadius: '5',
  },
  iOSOnCallOptions: {
    marginBottom: '23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsR1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsR2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsButton: {
    margin: '3%'
  },
  iOSOnCallOptionText: {
    color: 'white',
    opacity: '0.9',
    fontSize: 15,
    marginTop: '5%',
    textAlign: 'center',
  },
  iOSDecline: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#F54236',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iOSAccept: {
    marginLeft: '35%',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#2AC953',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iOSAcceptText: {
    marginLeft: '45%',
    color: 'white',
    fontSize: 12,
  },
  iOSSmallerOptionsText: {
    marginTop: 6,
    marginBottom: '16%',
    fontSize: 8,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
  },
  iOSSmallerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOptionsText: {
    marginTop: 10,
    fontSize: 8,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
    paddingBottom: '30%',
  },
  iOSCallID: {
    fontSize: 20,
    marginBottom: '95%',
    paddingTop: '29%',
    textAlignVertical: 'top',
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  },
  iOSOnCallID: {
    fontSize: 20,
    marginBottom: '32%',
    paddingTop: '26%',
    textAlignVertical: 'top',
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  },
  notifyImmediately: {
    margin: 12,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
  },
  terms: {
    marginTop: 25,
    margin: 18,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    marginTop: 95,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  confirmTerms: {
    marginTop: 85,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  body: {
    margin: 12,
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  countdownTimer: {
    margin: 12,
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  countdownCircle: {
    width: 140,
    height: 140,
    borderRadius: 100,
    margin: 30,
    backgroundColor: '#525252',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  button: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  buttonRed: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF1616',
  },
  buttonWhite: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  icon: {
    flex: 0.15,
    margin: 0,
    frontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#FFFFFF',
  },
  iconConfirm: {
    flex: 0.5,
    marginBottom: 50,
    frontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#FFFFFF',
  },
  buttonBackgroundCall: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 50,
  },
  cancelButtonBackground: {
    flex: 0.4,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 90,
  },
  buttonBackgroundNotify: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E68FF',
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 60,
  },
  backHomeButtonBackground: {
    flex: 0.225,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 185,
    marginBottom: 0,
  },
  buttonBackgroundEmergency: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    marginBottom: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="WarningCountdown"
          component={Countdown}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="AppleFakeCall"
          component={AppleFakeCall}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="AppleOnCall"
          component={AppleOnCall}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name="NotificationConfirmation"
          component={NotificationConfirmation}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
