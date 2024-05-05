import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedText } from "react-native-mask-text";
import { useNavigation } from '@react-navigation/native'; 

const TelaInicialCliente = () => {
  const { idUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [limpadores, setLimpadores] = useState('');
  const [loading, setLoading] = useState('');
  const navigation = useNavigation(); 

  const fetchLimpadores = async () => {
    try{
      const {data} = await axios.get(`${Url}/pessoa/limpadores`);
      setLimpadores(data)
    }catch(error){
      Alert.alert(error.message);
    }
  }


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
    handleName();
    fetchLimpadores();

  }, []);

  const CharacterItem = ({ data }) => {
    return (
    <TouchableOpacity onPress={ () => navigation.navigate('AgendamentoLimpeza', { idLimpador: data.id_pessoa })}>
      <View style={styles.characterContainer}>
       <View>
          <Text style={styles.text}>
            {data.nm_pessoa}
          </Text>
          <MaskedText 
            style={styles.text}
            mask="(99) 99999-9999"
          >
            {data.telefone1}
          </MaskedText>
          <Text>{data.descricao} </Text>
       </View>
      </View>
    </TouchableOpacity>  
    )
  }  

  const handleName = async () => {

    try {
      console.log(idUser)
      const {data} = await axios.get(`${Url}/pessoa/${idUser}`);
      setNmPessoa(data.nm_pessoa);
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleContent}>{currentTime}, {nmPessoa}!</Text>
      </View>
    </View>
    <SafeAreaView style={styles.block}>
        <FlatList
          data={limpadores}
          renderItem={({ item }) => <CharacterItem data={item} />}
          keyExtractor={(item) => item.id_pessoa.toString()}
        />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f223d',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,

  },
  characterContainer:{
    padding: 24,
    backgroundColor: "#2f3e75",
    margin: 16,
    borderRadius: 15,
    width: 350,
    height:160,
    flexDirection: "row",
    alignItems: "center",
  },
  text:{
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 30,
  },
  titleContent: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 7,
    padding: 8,
    fontSize: 22,
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default TelaInicialCliente;
