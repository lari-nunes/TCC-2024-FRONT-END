import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import LogoImage from '../img/logotcc.png';
import ButtonTpPessoa from './ButtonTpPessoa';

const TipoPessoa = ({ navigation }) => {
  const handleCadastro = (tipoPessoa) => {
    if (tipoPessoa === 'CLIENTE') {
      navigation.navigate('CadastroCliente');
    } else if (tipoPessoa === 'USUARIO') {
      navigation.navigate('CadastroUsuario');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Cadastrar-se como:</Text>
        <ButtonTpPessoa title="Cliente" onPress={() => handleCadastro('CLIENTE')} />
        <ButtonTpPessoa title="Limpador de Piscina" onPress={() => handleCadastro('USUARIO')} />
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
  },
  image: {
    width: 260,
    height: 250,
    marginBottom: -200,
    marginTop: 80,
  },
});

export default TipoPessoa;
