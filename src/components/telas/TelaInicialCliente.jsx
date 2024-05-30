import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import useAuthStore from '../../SaveId';
import Url from '../../Url';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedText } from "react-native-mask-text";
import { useNavigation } from '@react-navigation/native'; 
import ButtonAgendamentos from './ButtonAgendamentos';
import DateTimePicker from '@react-native-community/datetimepicker'

const TelaInicialCliente = () => {
  const { idUser } = useAuthStore();
  const [nmPessoa, setNmPessoa] = useState();
  const [currentTime, setCurrentTime] = useState('');
  const [limpadores, setLimpadores] = useState('');
  const [loading, setLoading] = useState('');
  const navigation = useNavigation(); 
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'black', padding: 20};

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
      <TouchableOpacity onPress={() => navigation.navigate('AgendamentoLimpeza', { idLimpador: data.id_pessoa })}>
        <View style={styles.characterContainer}>
          <View style={styles.textInfo}>
            <Text style={styles.textLabel}>Piscineiro(a):</Text>
            <Text style={styles.textLabel}>Telefone:</Text>
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
      console.log(idUser)
      const {data} = await axios.get(`${Url}/pessoa/${idUser}`);
      setNmPessoa(data.nm_pessoa);
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.log(error);
    }
  };

  const handleAgendamentos = () => {
    navigation.navigate('MeusAgendamentos');
    
  };

  return (
    <>
    
    <SafeAreaView style={styles.block}>
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.titleContent}>{currentTime}, {nmPessoa}!</Text>
      
      <TextInput
              numberOfLines={1}
              editable={false}
              placeholder="Choose Your Date of Birth"
              value={new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
              style={{
                fontSize: 16,
                paddingRight: 100,
                color: 'white',
                
              }}
          />
      </View>
      
    </View>
     
    <View style={styles.separator} />

    

    <View>
    <ButtonAgendamentos title="Meus Agendamentos" onPress={handleAgendamentos}/>
    </View>

    <PaperProvider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button style={{marginTop: 30, color: '#f2f', fontSize: 16}} onPress={showModal}>
          Show
        </Button>
      </PaperProvider>
      <View style={styles.textContainer}>
        <Text style={styles.textDisp}>Piscineiros(as) Disponíveis:</Text>
      </View>
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
    height: 100,
  },
  characterContainer: {
    padding: 24,
    backgroundColor: "#36D6EE",
    margin: 16,
    borderRadius: 8,
    width: 320,
    flexDirection: "row",
    alignItems: "center",
  },
  textInfo: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'white', padding: 20
  }
  ,
  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  textDetails: {
    flex: 1.2,
    marginLeft: 10,
    marginBottom: -1
  },
  text: {
    color: "#000",
    fontSize: 14,
  },
  description: {
    color: "#000",
    fontSize: 14,
    flexShrink: 1,  // Adiciona flexShrink para permitir que o texto se ajuste ao contêiner
  },
  textContainer: {
    width: '100%', // Garanta que o contêiner ocupe a largura total
    paddingHorizontal: 16, // Ajuste o padding conforme necessário
  },
  textDisp: {
    color: "#fff",
    fontSize: 18,
    margin: 12,
    marginLeft: 0,
    alignSelf: 'flex-start', // Adicione esta linha
  },
  titleContent: {
    color: '#fff',
    fontSize: 20,
  },
  block: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default TelaInicialCliente;