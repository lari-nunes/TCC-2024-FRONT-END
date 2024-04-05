// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Cadastro from './src/components/Cadastro';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f223d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
