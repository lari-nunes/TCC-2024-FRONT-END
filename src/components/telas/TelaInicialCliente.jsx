import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';

const TelaInicialCliente = () => {
  const [formData, setFormData] = useState({
    nm_pessoa: '',
    telefone1: ''
  });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    let greeting = '';
    if (currentHour < 12) {
      greeting = 'Bom dia';
    } else if (currentHour < 18) {
      greeting = 'Boa tarde';
    } else {
      greeting = 'Boa noite';
    }

    setCurrentTime(greeting);
  }, []);

  const handleCadastro = async () => {
    const { nm_pessoa, telefone1 } = formData;
    try {
      console.log(formData);
      const response = await axios.get(`${Url}/pessoa/${idUser}`);
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleContent}>{currentTime} {formData.nm_pessoa}</Text>
      </View>
      <Text style={styles.title}>TELA DE INÍCIO CLIENTE</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  titleContent: {
    color: '#fff',
    fontSize: 20,
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

export default TelaInicialCliente;
