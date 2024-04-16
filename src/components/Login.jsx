import React, { useState } from 'react';
import { TextInput, StyleSheet, Alert, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import MyButton from './MyButton';
import LogoImage from './img/logotcc.png';
import { useNavigation } from '@react-navigation/native'; 

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = () => {
    if (usuario === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const data = {
      usuario,
      senha,
    };

    console.log(data);
  };

  const handleNavRegister = () => {
    navigation.navigate('TipoPessoa');
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.hp}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={LogoImage} style={styles.image} />
          <Text style={styles.title}>Seja bem-vindo ao AppSwim</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            onChangeText={(text) => setUsuario(text)}
            value={usuario}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
            value={senha}
          />
          <MyButton title="Entrar" onPress={handleLogin} />
          <TouchableOpacity onPress={handleNavRegister}>
            <Text style={styles.textCad}> 
              Não possui login?{'\n'}
              Cadastra-se agora</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#0f223d'
  },
  textCad: {
    justifyContent: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 18,
    color: '#008cff'
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 25,
    marginTop: -15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1.5,
    width: 300,
    borderRadius: 10,
    height: 50,
    fontSize: 17,
    marginBottom: 15,
    borderColor: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    marginTop: -80,
  },
  hp: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default Login;
