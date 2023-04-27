import * as React from 'react';
import ReactUseState, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';

const LanguageSelect = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ['English', 'Spanish', 'French', 'Chinese', 'Cancel'];
    const cancelButtonIndex = 4;
    const title = 'Language Options';
    const message = 'Choose your preferred language';

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      title,
      message
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 1:
          // Save
          break;

        case cancelButtonIndex:
          // Canceled
      }});
  }

  return (
    
<TouchableOpacity
        style={styles.icon}
        color="white" 
        onPress={onPress}>
    <MaterialIcons name="public" size={32} color="#FFFFFF" />
</TouchableOpacity>
    
  );
};

export default LanguageSelect;


const styles = StyleSheet.create({
  icon: {
  //  flex: 0.15,
    margin: 0,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
