import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login'; 
import TipoPessoa from './src/components/TipoPessoa/TipoPessoa';
import CadastroCliente from './src/components/Cadastro/CadastroCliente';
import CadastroUsuario from './src/components/Cadastro/CadastroUsuario';
import TelaInicialCliente from './src/components/telas/TelaInicialCliente'
import TelaInicialUsuario from './src/components/telas/TelaInicialUsuario';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="TipoPessoa" component={TipoPessoa} options={{ title: 'Escolha o Tipo de Pessoa' }} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} options={{ title: 'Cadastro de Cliente' }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastro de Usuário' }} />
        <Stack.Screen name="TelaInicialCliente" component={TelaInicialCliente} options={{ title: 'Tela Inicial Cliente' }} />
        <Stack.Screen name="TelaInicialUsuario" component={TelaInicialUsuario} options={{ title: 'Tela Inicial Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
