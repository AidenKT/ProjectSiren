import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

// You can import from local files
import SirenLogo from './components/logo.js';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

const rowLetter = 'A';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBar style="light" />
      <SirenLogo />

      <Text style={styles.title}>We're here to help.</Text>
      <Text style={styles.subtitle}>Select from several safety options.</Text>
      
      <TouchableOpacity
        style={styles.buttonBackgroundNotify}
        onPress={() => navigation.navigate('WarningCountdown', {actionWarning: 'Notifying Transit Security in', type:"transitNotify"})}
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
        onPress={() => navigation.navigate('WarningCountdown', {actionWarning: 'Calling you in', type:"fakeCall"})}
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
        onPress={() => navigation.navigate('WarningCountdown', {actionWarning: 'Calling Emergency Services in', type:"callEmergency"})}
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

      <TouchableOpacity style={styles.icon} icon="earth" color="white" >
      <View style={styles.iconContainer}>
      <MaterialIcons name="public" size={24} color="#FFFFFF" />
    </View>
      </TouchableOpacity>
      <Text style={styles.terms}>
        You're in Row {rowLetter}.{' '}
        <Text style={styles.underlineText}>Reselect</Text>
        {'\n'}
        <Text style={styles.underlineText}>Terms of Service</Text>
        {'\n'}
        <Text style={styles.underlineText}>Privacy Policy</Text>
        {'\n'}© SIREN Project
      </Text>
    </View>
  );
}

function Countdown({props, route, navigation}) {
  const { actionWarning, type } = route.params;
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef(time);
  const immediateNotify = () => {
    timerRef.current = 0;
    setTime(0);
  };


  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

    let action
    let warning

    if (type == 'transitNotify') {
    action = "Transit Security will be notified with information, such as your location, to best assist you."
    warning = "It is illegal to make illegitimate calls to authorities.";
    }
    if (type == 'callEmergency') {
    action = "Emergency Services (911) & Transit Security will be dialed with information, such as your location, to best help you.";
    warning = "It is illegal to make illegitimate calls to authorities.";
    }
    if (type == 'fakeCall') {
    action = "You will receive a fake phone call from this application with a ringtone, tap anywhere on screen to stop ringtone.";
    warning = "Turn on the ringer to properly the ringtone.";
    }
  
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
      <Text style={styles.terms}>
      <Text>Entering sleep mode will interrupt the countdown.</Text>
      <Text>It is illegal to make illegitimate calls to authorities.</Text>
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
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
  },
  terms: {
    marginTop: 25,
    margin: 18,
    fontSize: 14,
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
    flex: 0.32,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 70,
    marginBottom: 50,
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
  buttonBackgroundEmergency: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    marginBottom: 40,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
