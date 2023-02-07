import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import SirenLogo from './components/logo.js';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

const rowLetter = "A";



export default function App() {
  return (
    
    <View style={styles.container}>
    <StatusBar barStyle="light-content" /> 
    <StatusBar style="light" />
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
      <Text style={styles.terms}>
        You're in Row {rowLetter}. <Text style={styles.underlineText}>Reselect</Text>{"\n"}
        <Text style={styles.underlineText}>Terms of Service</Text>{"\n"}
        <Text style={styles.underlineText}>Privacy Policy</Text>{"\n"}
        © SIREN Project

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
  terms: {
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
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 50,
  },
  buttonBackgroundNotify: {
    backgroundColor: "#3E68FF",
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonBackgroundEmergency: {
    flex: 0.25,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    marginBottom: 60,
  },
  boldText: {
    fontWeight: 'bold',
    },
  italicText: {
    fontStyle: 'italic',
    },
  underlineText: {
    textDecorationLine: 'underline',
    }
});
