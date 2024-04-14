import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

import axios from 'axios';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nm_pessoa: '',
    email: '',
    login: '',
    senha: '',
    telefone1: '',
    cpf: '',
  });

  const handleCadastro = async () => {
    try {
      console.log(formData)
      const {response} = await axios.post('http://192.168.0.32:8080/pessoa', formData);
    } catch (error) {
      
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Cadastro de Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, nm_pessoa: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, cpf: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, login: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, senha: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#fff"
        onChangeText={(text) => setFormData({ ...formData, telefone1: text })}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
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
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  },
});

export default CadastroCliente;
