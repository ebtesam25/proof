import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './screens/splash';
import Login from './screens/login';
import Reg from './screens/reg';
import Spotify from './screens/details';
import TheMap from './screens/map';
import NewIn from './screens/new';
import Details from './screens/details';
import UpdateIn from './screens/update';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
       <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Reg" 
        component={Reg} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="TheMap" 
        component={TheMap} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="NewInc" 
        component={NewIn} 
        options={{ headerShown: false}} 
      />
       <Stack.Screen 
        name="UpdateIn" 
        component={UpdateIn} 
        options={{ headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}