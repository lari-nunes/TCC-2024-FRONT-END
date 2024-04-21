import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const TelaInicialUsuario = () => {
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>TELA DE INÍCIO USUÁRIO</Text>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 7,
    padding: 8,
    fontSize: 22,
  }
});

export default TelaInicialUsuario;
