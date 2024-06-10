import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, TextInput, Platform, BackHandler } from 'react-native';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import MyButton from '../MyButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedText } from "react-native-mask-text";
import { useNavigation } from '@react-navigation/native';
import ButtonAgendamentos from './ButtonAgendamentos';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';

const TelaInicialCliente = () => {
  const { idUser, setIdUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [limpadores, setLimpadores] = useState([]);
  const navigation = useNavigation();
  const [dateTime, setDateTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [cidade, setCidade] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

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
      setLimpadores(data);
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

  const CharacterItem = ({ data }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AgendamentoLimpeza', { idLimpador: data.id_pessoa })}>
        <View style={styles.characterContainer}>
          <View style={styles.textInfo}>
            <Text style={styles.textLabel}>Piscineiro(a):</Text>
            <Text style={styles.textLabel}>WhatsApp:</Text>
          </View>
          <View style={styles.textDetails}>
            <Text style={styles.text}>{data.nm_pessoa}</Text>
            <MaskedText 
              style={styles.text}
              mask="(99) 99999-9999"
            >
              {data.telefone1}
            </MaskedText>
          </View>
        </View>
      </TouchableOpacity>
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

  const handleAgendamentos = () => {
    navigation.navigate('MeusAgendamentos');
  };

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

  const handleFilter = async () => {
    try {
      const formattedDate = format(dateTime, 'yyyy-MM-dd');      
      const {data} = await axios.get(`${Url}/pessoa/listaFiltro/${formattedDate}?nm_municipio=${cidade}`);
    
      if(data.length > 0){
        setLimpadores(data);
        hideModal();
      } else {
        Alert.alert('Erro', "Não foram encontrados limpadores com o filtro informado");
        hideModal();
      }
    } catch (error) {
    
      if(error.response.status === 404){
        Alert.alert('Erro', "Não foi encontrado limpadores com o filtro informado");
        hideModal();
        return;
      }
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.block}>
        <View style={styles.container}>

          <View style={styles.containerApp}>
            <View>
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
            
            <View >
              <Ionicons name="exit-outline" size={32} color="white" onPress={handleLogout} mode="contained" />
            </View>
          </View>
    
          <View style={styles.buttonAgend}>
            <ButtonAgendamentos title="Meus Agendamentos" onPress={handleAgendamentos} />
            <Button onPress={showModal} style={styles.modalButton}>
              <Text style={styles.showButton}> Filtrar piscineiros(as) por:</Text>
            </Button>
          </View>
   
          <View style={styles.textContainer}>
            <Text style={styles.textDisp}>Piscineiros(as) Disponíveis:</Text>
          </View>
          <FlatList
            style={styles.flatList}
            data={limpadores}
            renderItem={({ item }) => <CharacterItem data={item} />}
            keyExtractor={(item) => item.id_pessoa.toString()}
          />

        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <TextInput 
              style={styles.modalText}
              placeholder="Digite a cidade"
              placeholderTextColor="#afb9c9"
              onChangeText={setCidade}
              value={cidade}
            />
            <View>
              <ButtonAgendamentos onPress={showDatepicker} title="Selecionar Data" />
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
            <MyButton title="Filtrar" onPress={handleFilter} />
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f223d',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
  },
  containerApp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15, 
    
    margin: 5,
  },
  logoutButton: {
    backgroundColor: "#E6CC81",
    height: 50
  },
  ionicons: {
    marginLeft: 220,
    marginEnd: 100,
  },
  characterContainer: {
    padding: 18,
    backgroundColor: "#36D6EE",
    margin: 10,
    borderRadius: 8,
    width: 320,
    flexDirection: "row",
    alignItems: "center",
  },

  textInfo: {
    flex: 1,
  },
  showButton: {
    textAlign: 'center',
    color: '#000',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAgend: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1.5,
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
  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  textDetails: {
    flex: 1.2,
    marginLeft: 10,
    marginBottom: -1,
  },
  text: {
    color: "#000",
    fontSize: 14,
  },
  description: {
    color: "#000",
    fontSize: 14,
    flexShrink: 1,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  inputDataTime: {
    height: 40,
    width: 180,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },  
  textDisp: {
    color: "#fff",
    fontSize: 18,
    margin: 12,
    marginLeft: 0,
    alignSelf: 'flex-start',
  },
  titleContent: {
    color: '#fff',
    fontSize: 20,
    marginBottom: -10,
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  dateInput: {
    height: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
    color: 'white'
  },
  modalButton: {
    backgroundColor: '#fff',
    width: 250,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default TelaInicialCliente;
