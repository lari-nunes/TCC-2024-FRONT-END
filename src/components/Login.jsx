import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Alert, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import MyButton from './MyButton';
import LogoImage from './img/logotcc.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Url from '../Url';
import useAuthStore from '../SaveId';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { idUser, setIdUser } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (idUser !== null) {
      handleNavEnter();
    }
  }, [idUser]);

  const handleLogin = async () => {
    if (usuario === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await axios.post(`${Url}/login`, { login: usuario, senha });

      if (response.status === 200) {
        setIdUser(response.data.id);
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
      console.error(error);
    }
  };

  const handleNavEnter = async () => {
    const { data } = await axios.get(`${Url}/pessoa/${idUser}`);
    
    if (data.tp_pessoa == 'CLIENTE') {
      navigation.navigate('TelaInicialCliente');
    } else {
      navigation.navigate('TelaInicialUsuario');
    }
  };

  const handleNavRegister = () => {
    navigation.navigate('TipoPessoa');
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.textCad}>Não possui login? Cadastra-se agora</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
