import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const CadastroCliente = () => {

  return (
    <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={styles.title}>TESTE DE TELA CLIENTE</Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f223d',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        margin: 7,
        padding: 8,
        fontSize: 22,  
    },
    image: {
      width: 260,
      height: 250,
      marginBottom: -200,
      marginTop: 80,
    }
});

export default CadastroCliente;