import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import store from './store/index'
import Board from './screens/Board'
import Home from './screens/Home'
import Finish from './screens/Finish'
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {

  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Board} />
            <Stack.Screen name="Finish" component={Finish} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#F0F0FF',
    fontSize: 35
  }
});
