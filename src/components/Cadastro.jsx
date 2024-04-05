// Login.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Cadastro = () => {

  return (
    <View style={styles.container}>
     
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={styles.title}>Tela de Cadastro</Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4892d4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff'
    }
});

export default Cadastro;
