import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#E6CC81', 
    height: 45,
    width:295,
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff",
  },
  buttonTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ButtonAgendamentos = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonAgendamentos;