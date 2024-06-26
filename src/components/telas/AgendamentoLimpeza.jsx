import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, TextInput, Platform, ScrollView, TouchableOpacity } from 'react-native';
import useAuthStore from '../../SaveId';
import axios from 'axios';
import { MaskedText } from "react-native-mask-text";
import Url from '../../Url';
import { useRoute } from "@react-navigation/native";
import MyButton from '../MyButton';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { format } from 'date-fns';
import ButtonAgendamentos from './ButtonAgendamentos';
import Ionicons from '@expo/vector-icons/Ionicons';

const AgendamentoLimpeza = ({ navigation }) => {
  const { idUser } = useAuthStore();
  const [limpador, setLimpador] = useState('');
  const route = useRoute();
  const { idLimpador } = route.params;
  const [dateTime, setDateTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    dataAgendamento: '',
    observacao: '',
    id_pessoa: '',
    idLimpador: ''
  });

  useEffect(() => {
    fetchLimpador();
  }, []);

  const fetchLimpador = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${Url}/pessoa/${idLimpador}`);
      setLimpador(data);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    }  finally {
      setIsLoading(false);
    }
  };

  const agendamento = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Url}/pessoa/${idUser}`);
      const agendaData = {
        id_pessoa: idUser,
        observacao: agenda.observacao,
        dataAgendamento: dateTime,
        id_limpador: idLimpador
      };
      const responseAgenda = await axios.post(`${Url}/agenda`, agendaData);
      if (responseAgenda.status === 201) {
        Alert.alert('Sucesso! Seu cadastro foi realizado com sucesso!');
        handleRegister();
      }
      setLimpador(response);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setIsLoading(false);
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
            <View style={styles.container}> 
              <Text style={styles.textCad}>Cadastrar Agendamento de Limpeza</Text>

              <View style={styles.characterContainer}>
                <View>
                    <Text style={styles.textDetalhes}>
                      Detalhes do Piscineiro
                    </Text>
                    <View flexDirection="row">
                      <Ionicons name="person" size={20} color="black" mode="contained" />
                        <Text style={styles.text} marginLeft={5}>
                          {limpador.nm_pessoa}
                        </Text>
                    </View>
                  
                    <View flexDirection="row">
                      <Ionicons name="logo-whatsapp" size={20} color="black" mode="contained" />
                      <MaskedText 
                        style={styles.text}
                        marginLeft={5}
                        marginBottom={4}
                        mask="(99) 99999-9999"
                        keyboardType='numeric'
                        >
                        {limpador.telefone1}
                      </MaskedText>
                    </View> 
                    <View>
                      {limpador.descricao ? (
                        <View flexDirection="row">
                          <Ionicons name="chatbubble-ellipses" size={20} color="black" mode="contained" />
                          <Text style={styles.text} marginLeft={5}>
                            {limpador.descricao}
                          </Text>
                        </View>
                      ) : null}
                    </View> 
                </View>
              </View>

              <ButtonAgendamentos onPress={showDatepicker} title="Selecionar Data" />
              <ButtonAgendamentos onPress={showTimepicker} title="Selecionar Hora" />

              <View style={styles.inputAgend}> 
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
              <TouchableOpacity style={styles.buttonAg} onPress={agendamento} disabled={isLoading}>
                <Text style={styles.buttonTextAg}>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</Text>
              </TouchableOpacity>
              </View>
              
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
    paddingTop: 10,
    marginTop: 100
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputDataTime: {
    height: 45,
    width: 295,
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    flexDirection: "row",
    marginBottom: 10,
  },
  dateTime: {
    width: 100,
    margin: 50,
    paddingBottom: 20,
  },
  inputAgend: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textDetalhesPisc: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
    color: '#000',
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
  text: {
    color: '#000',
    fontSize: 14
  },
  buttonAg: {
    backgroundColor: '#24b8d1',
    width: 220, 
    borderRadius: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
    alignSelf: 'center', 
  },
  buttonTextAg: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textCad: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
  },
  characterContainer: {
    padding: 20,
    backgroundColor: "#24b8d1",
    margin: 20,
    borderRadius: 10,
    width: 320,
    height: 140,
    flexDirection: "row",
    alignItems: "center",
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    marginTop: 35,
  },
  input: {
    width: 350,
    height: 40,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    color: '#fff',
    marginBottom: 10
  },
  inputObs: {
    width: 295,
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#3876d9',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  }
});

export default AgendamentoLimpeza;
