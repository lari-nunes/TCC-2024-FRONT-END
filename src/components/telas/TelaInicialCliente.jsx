import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import { SafeAreaView } from 'react-native-safe-area-context';

const TelaInicialCliente = () => {
  const { idUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [limpadores, setLimpadores] = useState('');
  const [loading, setLoading] = useState('');

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
    const imageUrl = data.image || "";
    return (
    <TouchableOpacity>
      <View style={styles.characterContainer}>
       <View>
          <Text style={styles.text}>
            {data.nm_pessoa}
          </Text>
       </View>
       
      </View>
    </TouchableOpacity>  
    )
  }  

  const handleName = async () => {

    try {
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
        <Text style={styles.titleContent}>{currentTime}, {nmPessoa} !</Text>
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
    backgroundColor: '#05719c',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  characterContainer:{
    padding: 24,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 15,
    width: 350,
    height:100,
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
    padding: 25,
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
    backgroundColor: '#05719c',
    alignItems: 'center',
    justifyContent: 'center',
   
  }
});

export default TelaInicialCliente;
