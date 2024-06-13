import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, TextInput, Platform, BackHandler } from 'react-native';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import MyButton from '../MyButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';

const TelaInicialUsuario = () => {
  const { idUser, setIdUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const navigation = useNavigation();
  const [dateTime, setDateTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [servico, setServico] = useState({
    id_pessoa: idUser,
    descricao: '',
    vlr_estimado: 0
  });

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

  const fetchAgenda = async () => {
    try {
      const { data } = await axios.get(`${Url}/agenda/limpadoresView/${idUser}`);
      setAgendamentos(data);
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
    fetchAgenda();
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

  const handleRegister = async () => {
    if (!servico.descricao || servico.vlr_estimado <= 0) {
      Alert.alert('Erro', 'Preencha todos os campos para cadastrar o serviço.');
      return;
    }

    try {
      const { data } = await axios.post(`${Url}/servico`, servico);
      Alert.alert('Sucesso', 'Serviço cadastrado com sucesso');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
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
    const [mockPessoa, setMockPessoa] = useState({
      nm_pessoa: data.nm_pessoa,
      endereco: {
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.nm_municipio,
        numero: data.numero,
      }
    });

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
            <Ionicons name="person-outline" size={16} color="black" onPress={handleLogout} mode="contained" />
              Nome: {mockPessoa.nm_pessoa}
            </Text>
            <Text style={styles.text}>
            <Ionicons name="home-outline" size={16} color="black" onPress={handleLogout} mode="contained" />
              Endereço: {mockPessoa.endereco.rua}
            </Text>
            <Text style={styles.text}>
            <Ionicons name="home-outline" size={16} color="black" onPress={handleLogout} mode="contained" />
              Bairro: {mockPessoa.endereco.bairro}
            </Text>
            <Text style={styles.text} >
            <Ionicons name="home-outline" size={16} color="black" onPress={handleLogout} marginLeft={10} mode="contained" />
              Rua: {mockPessoa.endereco.cidade}
            </Text>
            <Text style={styles.text}>
            <Ionicons name="home-outline" size={16} color="black" onPress={handleLogout} mode="contained" />
              Número: {mockPessoa.endereco.numero}
            </Text>
            
          </View>
        </View>
      </TouchableOpacity>
    );
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
              <Ionicons name="exit-outline" size={32} marginLeft={50} color="white" onPress={handleLogout} mode="contained" />
            </View>
          </View>
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
                placeholder="Nome do serviço"
                placeholderTextColor="#afb9c9"
                onChangeText={(text) => setServico({ ...servico, descricao: text })}
              />
              <TextInput
                style={styles.modalText}
                placeholder="Valor do Serviço"
                placeholderTextColor="#afb9c9"
                onChangeText={(number) => setServico({ ...servico, vlr_estimado: number })}
              />
              <MyButton title="Cadastrar serviço" onPress={handleRegister} />
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
    backgroundColor: '#0f223d',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 5
  },
  containerApp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15, 
    
    margin: 5,
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
    height: 215,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showButton: {
    color: '#000',
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
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
    
  },
  characterContainer: {
    padding: 24,
    backgroundColor: "#24b8d1",
    margin: 16,
    borderRadius: 15,
    width: 340,
    height: 180,
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
    
    fontSize: 18,
    color: 'white',

  },
});

export default TelaInicialUsuario;
