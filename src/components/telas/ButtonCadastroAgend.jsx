import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#fff', 
    width:300,
    alignItems: 'center',
    color: "#fff"
  },
  buttonTitle: {
    color: '#000',
    fontSize: 18,
  },
});

const ButtonCadastroAgend = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCadastroAgend;