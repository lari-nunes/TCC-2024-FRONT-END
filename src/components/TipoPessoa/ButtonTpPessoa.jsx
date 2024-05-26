import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 7,
    borderRadius: 6,
    backgroundColor: '#24DDFC', 
    width:250,
    alignItems: 'center',
    color: "#fff"
  },
  buttonTitle: {
    color: '#000',
    fontSize: 18,
    fontSize: 18,
  },
});

const ButtonTpPessoa = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonTpPessoa;