import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import MyButton from '../MyButton';
import Url from '../../Url';
import { MaskedTextInput } from "react-native-mask-text";
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const CadastroUsuario = () => {
  const navigation = useNavigation(); 
  const [formData, setFormData] = useState({
    nm_pessoa: '',
    login: '',
    senha: '',
    telefone1: '',
    cpf: '',
    descricao: '',
    tp_pessoa: 'USUARIO'
  });
  const [address, setAddress] = useState({
    nm_municipio: '',
    id_pessoa: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastro = async () => {
    const { nm_pessoa, email, login, senha, telefone1, cpf, descricao} = formData;
    if (!nm_pessoa || !email || !login || !senha || !telefone1 || !cpf) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }
    try {
      console.log(formData);
      const response = await axios.post(`${Url}/pessoa`, formData);

      const enderecoData = {
        id_pessoa: response.data.id_pessoa,
        nm_municipio: address.nm_municipio,
      };

      const responseAddress = await axios.post(`${Url}/endereco`, enderecoData);
      if (responseAddress.status === 201) {
        Alert.alert('Sucesso', `Parabéns, ${nm_pessoa}! Cadastro salvo com sucesso!`);
        handleRegister(); 
      } 
    } catch (error) {
      Alert.alert('Erro',error.response.data.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Login'); 
  };

  return (
    <>
      <SafeAreaView style={styles.block}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Limpador de Piscina</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setFormData({ ...formData, nm_pessoa: text })}
            />
            <MaskedTextInput
              mask="(99) 99999-9999"
              value={formData.telefone1}
              style={styles.input}
              placeholder="Telefone"
              keyboardType='numeric'
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setFormData({ ...formData, telefone1: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <MaskedTextInput
              mask="999.999.999-99"
              style={styles.input}
              placeholder="CPF"
              keyboardType='numeric'
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setFormData({ ...formData, cpf: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setFormData({ ...formData, login: text })}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                placeholderTextColor="#afb9c9"
                onChangeText={(text) => setFormData({ ...formData, senha: text })}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#afb9c9" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setAddress({ ...address, nm_municipio: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="#afb9c9"
              maxLength={200}
              onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            />
            <MyButton title="Cadastrar" onPress={handleCadastro} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f223d',
    padding: 20,
    marginTop: 100
  },
  title: {
    fontSize: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    marginTop: 38,
  }
});

export default CadastroUsuario;
