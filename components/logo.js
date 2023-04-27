import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function SirenLogo() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/siren-icon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    height: 82,
    width: 82,
  }
});
