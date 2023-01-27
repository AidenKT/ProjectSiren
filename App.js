import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import SirenLogo from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>

    <SirenLogo />


      <Text style={styles.title}>
        We're here to help.
      </Text>
        <Text style={styles.subtitle}>
        Select from several safety options.
      </Text>
      <Button style={styles.buttonBackgroundNotify} labelStyle={{ color: "#FFFF", fontWeight: "bold" }} uppercase={false} icon="phone" mode="contained">
        <Text style={styles.button}>
        Notify Transport Security
        </Text>
      </Button>

      <Button style={styles.buttonBackground} labelStyle={{ color: "black", fontWeight: "bold" }} color="#3E68FF" uppercase={false} icon="bell" mode="contained">
        <Text style={styles.button}>
        Get a Fake Phone Call
        </Text>
      </Button>

      <Button style={styles.buttonBackgroundEmergency} labelStyle={{color: "#FF1616", fontWeight: "bold"}} color="#3E68FF" uppercase={false} icon="alert" mode="contained">
        <Text style={styles.button}>
        Call the Authorities
        </Text>
      </Button>
      <Button style={styles.icon} icon="earth" color="white" />
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
    fontSize: 18,
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
  button: {
    margin: 0,
    fontSize: 20,
    frontWeight: 'bold',
    textAlgin: 'center',
  },
  icon: {
    flex: 0.15,
    margin: 0,
    frontWeight: 'bold',
    justifyContent: 'center',
    tintColor: '#FFFFFF',
  },
  buttonBackground: {
    flex: 0.13,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    
  },
  buttonBackgroundNotify: {
    backgroundColor: "#3E68FF",
    flex: 0.13,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonBackgroundEmergency: {
    flex: 0.13,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  }
});
