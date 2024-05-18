import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login'; 
import 'react-native-gesture-handler';
import TipoPessoa from './src/components/TipoPessoa/TipoPessoa';
import CadastroCliente from './src/components/Cadastro/CadastroCliente';
import CadastroUsuario from './src/components/Cadastro/CadastroUsuario';
import TelaInicialCliente from './src/components/telas/TelaInicialCliente'
import TelaInicialUsuario from './src/components/telas/TelaInicialUsuario';
import AgendamentoLimpeza from './src/components/telas/AgendamentoLimpeza';
import MeusAgendamentos from './src/components/telas/MeusAgendamentos';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="TelaInicialCliente" component={TelaInicialCliente} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="TipoPessoa" component={TipoPessoa} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="TelaInicialUsuario" component={TelaInicialUsuario} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentos} options={{ headerShown: false, headerTransparent: true, title: null }} />
        <Stack.Screen name="AgendamentoLimpeza" component={AgendamentoLimpeza} options={{ headerShown: false, headerTransparent: true, title: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
