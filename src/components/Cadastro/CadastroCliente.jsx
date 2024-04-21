import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import MyButton from '../MyButton';
import axios from 'axios';

const CadastroCliente = () => {
  const navigation = useNavigation(); 
  const [formData, setFormData] = useState({
    nm_pessoa: '',
    login: '',
    senha: '',
    telefone1: '',
    cpf: '',
    tp_pessoa: 'CLIENTE'
  });
  const [address, setAddress] = useState({
    nm_municipio: '',
    rua: '',
    bairro:'', 
    numero: '',
    id_pessoa: ''
  });

  const handleCadastro = async () => {
    const { nm_pessoa, email, login, senha, telefone1, cpf } = formData;
    if (!nm_pessoa || !email || !login || !senha || !telefone1 || !cpf) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }

    try {
      
      const response = await axios.post('http://192.168.0.27:8080/pessoa', formData);
      
      const enderecoData = {
        id_pessoa: response.data.id_pessoa,
        nm_municipio: address.nm_municipio,
        rua: address.rua,
        bairro: address.bairro,
        numero: address.numero
      };
    
      const responseAddress = await axios.post('http://192.168.0.27:8080/endereco', enderecoData);

      if (response.status === 201 && responseAddress.status === 201) {
        Alert.alert('Sucesso', `Parabéns, ${nm_pessoa}! Cadastro salvo com sucesso!`);
        handleRegister(); 
      } 
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', error.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Cadastro de Cliente</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setAddress({ ...address, nm_municipio: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Rua"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setAddress({ ...address, rua: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setAddress({ ...address, bairro: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        placeholderTextColor="#afb9c9"
        onChangeText={(text) => setAddress({ ...address, numero: text })}
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

export default CadastroCliente;