import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, TextInput, Platform, BackHandler } from 'react-native';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import MyButton from '../MyButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ButtonAgendamentos from './ButtonAgendamentos';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';

const TelaInicialUsuario = () => {
  const { idUser, setIdUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const navigation = useNavigation();
  const [dateTime, setDateTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const fetchLimpadores = async () => {
    try {
      const { data } = await axios.get(`${Url}/pessoa/limpadores`);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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

  const handleLogout = () => {
    Alert.alert(
      'Confirmação',
      'Você deseja sair mesmo?',
      [
        {
          text: 'Sim',
          onPress: () => {
            setIdUser(null);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ],
    );
  };

  const handleName = async () => {
    try {
      const { data } = await axios.get(`${Url}/pessoa/${idUser}`);
      setNmPessoa(data.nm_pessoa);
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
              {data.observacao}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerApp}>
          <View style={styles.leftContainer}>
            <Text style={styles.titleContent}>{currentTime}, {nmPessoa}!</Text>
            <TextInput
              numberOfLines={1}
              editable={false}
              value={new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
              style={styles.dateInput}
            />
          </View>
          <Ionicons name="exit-outline" size={32} color="white" onPress={handleLogout} mode="contained" />
        </View>

        <View style={styles.content}>
          <View style={styles.modalButton}>
            <Button onPress={showModal} >
              <Text style={styles.showButton}> Cadastrar serviço</Text>
            </Button>
          </View>

          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
              <TextInput 
                style={styles.modalText}
                placeholder="Digite a cidade"
                placeholderTextColor="#afb9c9"
              />
              <View>
                <ButtonAgendamentos onPress={showDatepicker} title="Selecionar data de serviço" />
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dateTime}
                    mode={mode}
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
              <TextInput
                style={styles.inputDataTime}
                placeholder="Data"
                placeholderTextColor="#afb9c9"
                value={format(dateTime, 'dd/MM/yyyy')}
                editable={false}
              />
              <TextInput
                style={styles.modalText}
                placeholder="Campo vazio"
                placeholderTextColor="#afb9c9"
              />
              <MyButton title="Cadastrar serviço" />
            </Modal>
          </Portal>

          <Text style={styles.textAgend}>Meus Agendamentos</Text>
          <FlatList
            data={agendamentos}
            renderItem={({ item }) => <CharacterItem data={item} />}
            keyExtractor={(item) => item.id_agenda.toString()}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerApp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15, 
    margin: 10,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 10, 
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showButton: {
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#E6CC81',
    width: 200,
    height: 40,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000'
  },
  textAgend: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 6,
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
  titleContent: {
    color: '#fff',
    fontSize: 20,
    marginBottom: -10,
  },
  dateInput: {
    height: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white'
  },
  inputDataTime: {
    height: 40,
    width: 180,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
    color: '#000'
  }
});

export default TelaInicialUsuario;
