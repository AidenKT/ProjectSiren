import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

// You can import from local files
import SirenLogo from './components/logo.js';
import LanguageSelect from './components/language.js';
import RowSelect from './components/row.js';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

const rowLetter = 'A';

function MainScreen({ navigation }) {
  const [rowLetter, setRowLetter] = useState('A');
  return (
    <ActionSheetProvider>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBar style="light" />
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => {
        Alert.alert("\n Project Siren Credits", "\n Software Lead \n Aiden Tabrizi \n \n Business Lead \n Keala Minna-Choe \n \n Hardware Lead \n Leo Tian \n \n Marketing Lead \n Kailani Minna-Choe \n \n Secretary \n Julia Aguirre \n \n Finance \n Aiden Tabrizi \n \n Advisor \n Dvora Celniker \n \n Hardware Team \n Leo Tian \n Kai Minna-Choe \n Keala Minna-Choe \n Alex Sellemi \n Jay Liang \n \n Software Team \n Aiden Tabrizi \n Kailani Minna-Choe \n Madison Mendoza \n \n Business Team \n Keala Minna-Choe \n Kailani Minna-Choe \n Leo Tian \n Aiden Tabrizi \n Shruti Malladi \n Madison Mendoza \n Julia Aguirre \n \n Localization \n Aiden Tabrizi - English \n Julia Aguirre - Spanish \n \n Special Thanks \n STEM Solutions for Tomorrow Club \n \n Made with ❤️ by Canyon Crest Academy Students in collaboration with San Diego MTS.", [
      {text: 'Go Back', style: 'cancel'},
    ]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
        }}>
      <SirenLogo />
      </TouchableOpacity>

      <Text style={styles.title}>We're here to help.</Text>
      <Text style={styles.subtitle}>Select from several safety options.</Text>
      
      <TouchableOpacity
        style={styles.buttonBackgroundNotify}
        onPress={() => {
          navigation.navigate('WarningCountdown', {actionWarning: 'Notifying Transit Security in', type:"transitNotify", row:rowLetter})
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }}
        activeOpacity={.7}
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
          navigation.navigate('WarningCountdown', {actionWarning: 'Calling you in', type:"fakeCall", row:rowLetter})
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }}
        labelStyle={{ color: 'black', fontWeight: 'bold' }}
        color="#3E68FF"
        activeOpacity={.7}
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
          navigation.navigate('WarningCountdown', {actionWarning: 'Calling Emergency Services in', type:"callEmergency", row:rowLetter})
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }}
        labelStyle={{ color: '#FF1616', fontWeight: 'bold' }}
        color="#3E68FF"
        activeOpacity={.7}
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
     <RowSelect rowLetter={rowLetter} setRowLetter={setRowLetter}/>
     </View>

        {'\n'}
     <Text onPress={() => {
           Alert.alert('Privacy Policy', 'In the future will link to real Privacy Policy. For now though, I collect your device statistics, identifiers, crash, and diagonstic reports, as well as additional information on your sessions. No location or audio information is currently being used, and all data collected is through TestFlight.');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
     }}
           style={styles.underlineText}>
     Privacy Policy
     </Text> 
        {'\n'}
     <Text onPress={() => {
          alert('This feature is coming soon. -Aiden :D');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
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



function NotificationConfirmation({props, route, navigation}) {
  const { passedType, row } = route.params;

    let completedAction
    let titleAction
    //let warning

    if (passedType == 'fakeCall') {
      titleAction = "Fake Call under construction. \n Try a different option."
    //warning = "It is illegal to make illegitimate calls to authorities.";
    }
    if (passedType == 'transitNotify') {
      titleAction = "Help is on the way."
      completedAction = "We've notified Transit Security with your location and audio information to assist you."
    //warning = "It is illegal to make illegitimate calls to authorities.";
    }
    if (passedType == 'callEmergency') {
      titleAction = "Help is on the way."
      completedAction = "We've notified Emergency Services and Transit Security with your location and audio information.";
    //warning = "It is illegal to make illegitimate calls to authorities.";
    }


  
  return(
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
      activeOpacity={.7}
      uppercase={false}
      mode="contained"
      accessibilityLabel="Back to Home Screen.">
      <Text style={styles.button}>Back to Home Screen</Text>
      </TouchableOpacity>
<Text style={styles.confirmTerms}>
        You're in Row {row}.
        {'\n'}
     <Text onPress={() => {
           alert('In the future will link to real Privacy Policy. For now though, I collect your device statistics, identifiers, crash, and diagonstic reports, as well as additional information on your sessions. No location or audio information is currently being used, and all data collected is through TestFlight.');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
     }}
           style={styles.underlineText}>
     Privacy Policy
     </Text> 
        {'\n'}
     <Text onPress={() => {
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

function Countdown({props, route, navigation}) {
  const { actionWarning, type, row } = route.params;
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef(time);
  const immediateNotify = () => {
    timerRef.current = 0;
    setTime(0);
  };

  let passingType
  let action
  let warning

    if (type == 'transitNotify') {
    action = "Transit Security will be notified with information, such as your location and audio information, to best assist you."
    warning = "It is illegal to make illegitimate calls to authorities.";
    passingType = 'transitNotify';
    }
    if (type == 'callEmergency') {
    action = "Emergency Services (911) & Transit Security will be dialed with information, such as your location, to best help you.";
    warning = "It is illegal to make illegitimate calls to authorities.";
    passingType = 'callEmergency';
    }
    if (type == 'fakeCall') {
    action = "You will receive a fake phone call from this application with a ringtone, tap anywhere on screen to stop ringtone.";
    warning = "Ensure your ringer is turned on to hear the ringtone.";
    passingType = 'fakeCall';
    }

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.navigate('NotificationConfirmation', {passedType:passingType, row:row});
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);


  
  return(
    <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <StatusBar style="light" />
    <Text style={styles.title}>{actionWarning}</Text>
    <View style={styles.countdownCircle}>
    <Text style={styles.countdownTimer}>{time}</Text>
    </View>
    <Text style={styles.title}>seconds.</Text>
    <Text style={styles.subtitle}>{action}</Text>
    <TouchableOpacity 
    activeOpacity={.4}
    onPress={immediateNotify}>
    <Text style={styles.notifyImmediately}>
      Notify Immediately
    </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.cancelButtonBackground}
      onPress={() => navigation.goBack()}
      labelStyle={{ color: 'black', fontWeight: '500' }}
      color="#3E68FF"
      activeOpacity={.7}
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
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="WarningCountdown" component={Countdown} />
        <Stack.Screen name="NotificationConfirmation" component={NotificationConfirmation} options={{gestureEnabled: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
