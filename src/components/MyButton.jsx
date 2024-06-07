import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#24b8d1', 
    width:260,
    alignItems: 'center',
    color: "#fff",
    height: 40
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;