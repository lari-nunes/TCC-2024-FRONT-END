import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, TextInput, Button, Platform } from 'react-native';
import useAuthStore from '../../SaveId';
import axios from 'axios';
import { MaskedText } from "react-native-mask-text";
import Url from '../../Url';
import { useRoute } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import MyButton from '../MyButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import ButtonAgendamentos from './ButtonAgendamentos';
import { ScrollView } from 'react-native-gesture-handler';


const AgendamentoLimpeza = ({navigation}) => {
  const { idUser, setIdUser } = useAuthStore();
  const [limpador, setLimpador] = useState('');
  const route = useRoute();
  const {idLimpador} = route.params;
  const [dateTime, setDateTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(Platform.OS === 'ios');
    setDateTime(currentDate);
    setAgenda({ ...agenda, dt_agendamento: currentDate.toISOString() });
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [agenda, setAgenda] = useState({
    dtAgendamento: '',
    observacao: '',
    id_pessoa: '',
    idLimpador: ''
  });

  useEffect(() => {
    fetchLimpador();
  },[]) ;

  
  const fetchLimpador = async() => {
    try {
      const {data} = await axios.get(`${Url}/pessoa/${idLimpador}`);
      setLimpador(data);
    }catch (error) {
      Alert.alert('Erro',  error.response.data.message);
    }
  };

  const agendamento = async () => {
    try {
      const response = await axios.get(`${Url}/pessoa/${idUser}`);
      const agendaData = {
        id_pessoa: idUser,
        observacao: agenda.observacao,
        dataAgendamento: dateTime,
        idLimpador: idLimpador
      };
      console.log(agendaData);
      const responseAgenda= await axios.post(`${Url}/agenda`, agendaData);
      if (responseAgenda.status === 201) {
        Alert.alert('Sucesso! Seu cadastro foi realizado com sucesso!');
        handleRegister(); 
      } 
      setLimpador(response)
    } catch (error) { 
      Alert.alert('Erro',  error.response.data.message);
    }
  };
  
  const handleRegister = () => {
    navigation.navigate('TelaInicialCliente'); 
  };

  return (
    <>
      <SafeAreaView style={styles.block}>
        <ScrollView>
        <View style={styles.Teste}>
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
                  keyboardType='numeric'
                >
                  {limpador.telefone1}
                </MaskedText>
                <Text style={styles.text}>{limpador.descricao} </Text>
            </View>
          </View>
        
          <View  style={styles.container}> 
            <Text style={styles.textCad}>Cadastrar Agendamento de Limpeza</Text>
            

            <ButtonAgendamentos onPress={showDatepicker} title="Selecionar Data" />
            <ButtonAgendamentos onPress={showTimepicker} title="Selecionar Hora" />
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateTime}
                mode={mode}
                display="default"
                onChange={handleDateChange}
                style={styles.dateTime}
             
              />
            )}
              <TextInput
                style={styles.inputDataTime}
                placeholder="Data de Agendamento"
                placeholderTextColor="#afb9c9"
                value={format(dateTime, 'dd/MM/yyyy HH:mm')}
                editable={false}
              />
              <TextInput
              style={styles.inputObs}
              placeholder="Observação"
              placeholderTextColor="#afb9c9"
              onChangeText={(text) => setAgenda({ ...agenda, observacao: text })}
              multiline={true}
            />
            <MyButton title="Cadastrar" onPress={agendamento} />
          </View>
          
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
    marginTop: 50
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    
  },
  inputDataTime:{
    height: 40,
    width: 355,
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    flexDirection: "row",
  },
  dateTime:{
    width: 100,
    margin: 50,
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
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
    color: 'white',
  },
  textCad: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
  },
  characterContainer:{
    padding: 20,
    backgroundColor: "#2f3e75",
    margin: 20,
    borderRadius: 10,
    width: 350,
    height:180,
    marginBottom: 20,
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
    width: 350,
    height: 40,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  },
  inputObs: {
    width: 350,
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  
  }
});

export default AgendamentoLimpeza;