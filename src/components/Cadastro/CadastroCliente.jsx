import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyButton from '../MyButton';
import axios from 'axios';
import Url from '../../Url';
import { MaskedTextInput } from 'react-native-mask-text';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const CadastroCliente = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
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
    bairro: '',
    numero: '',
    id_pessoa: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastro = async () => {
    const { nm_pessoa, email, login, senha, telefone1, cpf } = formData;
    if (!nm_pessoa || !email || !login || !senha || !telefone1 || !cpf) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }
    
    if (senha.length > 6) {
      Alert.alert('Erro', 'A senha deve ter no máximo 6 caracteres.');
      return;
    }

    try {
      setIsLoading(true);
      console.log(formData);
      const response = await axios.post(`${Url}/pessoa`, formData);

      const enderecoData = {
        id_pessoa: response.data.id_pessoa,
        nm_municipio: address.nm_municipio,
        rua: address.rua,
        bairro: address.bairro,
        numero: address.numero
      };

      const responseAddress = await axios.post(`${Url}/endereco`, enderecoData);
      if (responseAddress.status === 201) {
        Alert.alert('Sucesso', `Parabéns, ${nm_pessoa}! Cadastro salvo com sucesso!`);
        handleRegister();
      }
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.block}>
      <ScrollView>
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
              onChangeText={(text) => {
                if (text.length <= 6) {
                  setFormData({ ...formData, senha: text });
                } else {
                  Alert.alert('Erro', 'A senha deve ter no máximo 6 caracteres.');
                }
              }}
              value={formData.senha}
            />
            <TouchableOpacity
              style={styles.togglePassword}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#afb9c9" />
            </TouchableOpacity>
          </View>
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
            keyboardType='numeric'
            placeholderTextColor="#afb9c9"
            onChangeText={(text) => setAddress({ ...address, numero: text })}
          />
           <TouchableOpacity style={styles.buttonCad} onPress={handleCadastro} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'Cadastrando conta...' : 'Cadastrar'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f223d',
    padding: 20,
    marginTop: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  buttonCad: {
    backgroundColor: '#24b8d1',
    width: '80%', 
    borderRadius: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
    alignSelf: 'center', 
  },
  input: {
    width: 350,
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
    borderWidth: 1,
    width: 350,
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    borderColor: '#3876d9',
    paddingHorizontal: 10,
  },
  togglePassword: {
    marginLeft: -30,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff'
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    marginTop: 38,
  }
});

export default CadastroCliente;
