import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, parseISO } from 'date-fns';
import { TextInput } from 'react-native-gesture-handler';

const MeusAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]); 
  const { idUser } = useAuthStore();

  useEffect(() => {
    handleName();
  }, []);

  const handleName = async () => {
    try {
      const { data } = await axios.get(`${Url}/agenda/listarAgendamentos/${idUser}`);
      setAgendamentos(data);
      console.log(data);
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  const CharacterItem = ({ data }) => {
    const formattedDate = format(parseISO(data.dataAgendamento), 'dd/MM/yyyy HH:mm');
    return (
      <TouchableOpacity>
        <View style={styles.characterContainer}>
          <View>
            <TextInput
              style={styles.text}
              placeholder="Data de Agendamento"
              placeholderTextColor="#afb9c9"
              value={formattedDate}
              editable={false}
            />
            <Text style={styles.text}>
              {data.descricao}
            </Text>
            <Text style={styles.text}>
              {data.pessoa ? data.pessoa.nm_pessoa : 'Nome não disponível'}
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textAgend}>Meus Agendamentos</Text>
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
  textAgend: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  text: {
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  characterContainer: {
    padding: 24,
    backgroundColor: "#34b4eb",
    margin: 16,
    borderRadius: 15,
    width: 320,
    height: 150,
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
