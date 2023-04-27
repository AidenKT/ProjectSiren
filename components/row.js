import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';

const RowSelect = ({ rowLetter, setRowLetter }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  useEffect(() => {
    setRowLetter(rowLetter);
  }, [rowLetter]);

  const onPress = () => {
    const options = ['Row A', 'Row B', 'Row C', 'Row D', 'Row E', 'Row F', 'Cancel'];
    const cancelButtonIndex = 6;
    const title = 'Select Row';
    const message = 'Which row are you located in?';

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title,
        message,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            rowLetter = 'A';
            setRowLetter('A');
            break;
          case 1:
            rowLetter = 'B';
            setRowLetter('B');
            break;
          case 2:
            rowLetter = 'C';
            setRowLetter('C');
            break;
          case 3:
            rowLetter = 'D';
            setRowLetter('D');
            break;
          case 4:
            rowLetter = 'E';
            setRowLetter('E');
            break;
          case 5:
            rowLetter = 'F';
            setRowLetter('F');
            break;
          case cancelButtonIndex:
            // Canceled
        }
      }
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.adjustText} onPress={onPress}>
        <Text style={styles.reselect}>Reselect</Text>
      </TouchableOpacity>
      <Text style={{ display: 'none' }}>{rowLetter}</Text>
    </View>
  );
};

export default RowSelect;

const styles = StyleSheet.create({
  reselect: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
    textDecorationLine: 'underline',
    marginBottom: -2.5,
  },
});
