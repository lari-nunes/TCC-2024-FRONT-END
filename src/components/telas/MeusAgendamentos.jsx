import React, { useState,useEffect } from 'react';
import {  StyleSheet, Text, View, Alert, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import { SafeAreaView } from 'react-native-safe-area-context';

const MeusAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState('');
    const { idUser } = useAuthStore();

    useEffect(() => {
 
        handleName();
      }, []);
    const handleName = async () => {

        try {
          const {data} = await axios.get(`${Url}/agenda/listarAgendamentos/${idUser}`);
    
          setAgendamentos(data);
        } catch (error) {
          Alert.alert('Erro', error.message);
          console.log(error);
        }
      };

      const CharacterItem = ({ data }) => {
        return (
            <TouchableOpacity>
            <View style={styles.characterContainer}>
             <View>
                <Text style={styles.text}>
                  {data.dt_agendamento}
                </Text>
                <Text style={styles.text}>
                  {data.descricao}
                </Text>
                <Text style={styles.text}>
                  {data.pessoa.nm_pessoa}
                </Text>
                <Text style={styles.text}>
                  {data.telefone1}
                </Text>
                <Text style={styles.text}>
                  {data.observacao}
                </Text>
             </View>
            </View>
          </TouchableOpacity>  
        )
      }
  

  return (
   <SafeAreaView style={styles.container}>
    <View>
        <Text>Meus Agendamentos</Text>
    </View>
        <FlatList
          data={agendamentos}
          renderItem={({ item }) => <CharacterItem data={item} />}
          keyExtractor={(item) => item.id_agenda.toString()}
        />
   </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text:{
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  characterContainer:{
    padding: 24,
    backgroundColor: "#34b4eb",
    margin: 16,
    borderRadius: 15,
    width: 320,
    height:120,
    flexDirection: "row",
    alignItems: "center",
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

export default MeusAgendamentos;