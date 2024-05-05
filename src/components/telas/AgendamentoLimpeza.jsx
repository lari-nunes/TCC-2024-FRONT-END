import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, TextInput} from 'react-native';
import useAuthStore from '../../SaveId';
import axios from 'axios';
import { MaskedText } from "react-native-mask-text";
import Url from '../../Url';
import { useRoute } from "@react-navigation/native";

const AgendamentoLimpeza = ({navigation}) => {
  const { idUser } = useAuthStore();
  const [limpador, setLimpador] = useState('');
  const [agendamentoLimp, setAgendamento] = useState('');
  const route = useRoute();
  const {idLimpador} = route.params;

  const agendamento = async () => {
    try {
      const {data} = await axios.get(`${Url}/pessoa/${idLimpador}`);
      
      setLimpador(data);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    agendamento()

  }, []);
  

  return (
    <>
    <SafeAreaView style={styles.block}>
    <TouchableOpacity >
      <View style={styles.characterContainer}>
       <View>
          <Text style={styles.textDetalhes}>
            Detalhes do Limpador de Piscina
          </Text>
          <Text style={styles.text}>
            {limpador.nm_pessoa}
          </Text>
          <MaskedText 
            style={styles.text}
            mask="(99) 99999-9999"
          >
            {limpador.telefone1}
          </MaskedText>
          <Text>{limpador.descricao} </Text>
       </View>
      </View>
      <View >
        <Text style={styles.textCad}>Cadastrar Agendamento de Limpeza</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#afb9c9"
          onChangeText={(text) => setFormData({ ...formData, nm_pessoa: text })}
        />
        <TextInput
            numberOfLines={1}
            editable={false}
            placeholder="Choose Your Date of Birth"
            value={format('DD MMMM, YYYY')}
            style={{
              fontSize: 16,
              paddingVertical: 10,
              color: 'black',
            }}
          />
      </View>
    </TouchableOpacity>  
    </SafeAreaView>
    </>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 7,
    padding: 8,
    fontSize: 22,
  },
  textDetalhes: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    textAlign: 'center',
  },
  textCad: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    textAlign: 'center',
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
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    marginTop: 35
   
  },
  input: {
    width: '100%',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  }
});

export default AgendamentoLimpeza;
