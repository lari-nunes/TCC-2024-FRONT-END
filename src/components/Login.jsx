import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Alert, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import LogoImage from './img/logotcc.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Url from '../Url';
import useAuthStore from '../SaveId';
import { Feather } from '@expo/vector-icons';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { idUser, setIdUser } = useAuthStore();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (idUser !== null) {
      handleNavEnter();
    }
  }, [idUser]);

  const handleLogin = async () => {
    setIdUser(null);
    setIsLoading(true);
    try {
      
      const response = await axios.post(`${Url}/login`, { login: usuario, senha });

      if (response.status === 200) {
        setIdUser(response.data.id);
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        Alert.alert('Erro', 'Login ou senha incorretos!');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavEnter = async () => {
    const { data } = await axios.get(`${Url}/pessoa/${idUser}`);
    console.log(data);
    if (data.tp_pessoa == 'CLIENTE') {
      navigation.navigate('TelaInicialCliente');
    } else {
      navigation.navigate('TelaInicialUsuario');
    }
  };

  const handleNavRegister = () => {
    navigation.navigate('TipoPessoa');
  };

  const handleAccess = () => {
    if (usuario === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else {
      handleLogin();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.hp}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image source={LogoImage} style={styles.image} />
            <Text style={styles.title}>Seja bem-vindo ao AppSwim</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              onChangeText={(text) => setUsuario(text.trim())}
              value={usuario}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setSenha(text)}
                value={senha}
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAccess} disabled={isLoading}>
              <Text style={styles.buttontext}>{isLoading ? 'Acessando conta...' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavRegister}>
              <Text style={styles.textCad}>Não possui login? Cadastra-se agora</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f223d',
    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 55
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textCad: {
    marginTop: 20,
    fontSize: 18,
    color: '#008cff',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    width: 300,
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
    borderColor: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  togglePassword: {
    marginLeft: -30,
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
  },
  passwordInput: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 8,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  hp: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  button: {
    backgroundColor: '#24b8d1',
    width: '80%', 
    borderRadius: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
    alignSelf: 'center', 
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
