import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack, useRouter } from 'expo-router';
import  LoginScreen  from '../screens/loginScreen.js';
import RegisterScreen from '../screens/registerScreen.js';
import StartingScreen from '../screens/startingScreen.js';
import MainScreen from '../screens/main.js';

const App = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();
    return (
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={ { headerShown: false } }>
                    <Stack.Screen name="Starting" component={StartingScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name = "Main" component={MainScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default App;