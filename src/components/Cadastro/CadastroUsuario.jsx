import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import MyButton from '../MyButton';
import Url from '../../Url';

const CadastroUsuario = () => {
  const navigation = useNavigation(); 
  const [formData, setFormData] = useState({
    nm_pessoa: '',
    login: '',
    senha: '',
    telefone1: '',
    cpf: '',
    tp_pessoa: 'USUARIO'
  });

  const handleCadastro = async () => {
    const { nm_pessoa, email, login, senha, telefone1, cpf } = formData;
    if (!nm_pessoa || !email || !login || !senha || !telefone1 || !cpf) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }
    try {
      console.log(formData);
      const response = await axios.post(`${Url}/pessoa`, formData);
      if (response.status === 201) {
        Alert.alert('Sucesso', `Parabéns, ${nm_pessoa}! Cadastro salvo com sucesso!`);
        handleRegister(); 
      } 
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Cadastro de Limpador de Piscina</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, nm_pessoa: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, cpf: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, login: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, senha: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setFormData({ ...formData, telefone1: text })}
      />
      <MyButton title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f223d',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  },
});

export default CadastroUsuario;