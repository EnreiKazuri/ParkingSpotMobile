import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack, useRouter } from 'expo-router';
import  LoginScreen  from '../screens/loginScreen.js';
import RegisterScreen from '../screens/registerScreen.js';
import StartingScreen from '../screens/startingScreen.js';

const App = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={ { headerShown: false } }>
                <Stack.Screen name="Starting" component={StartingScreen} options={{gestureDirection: 'vertical'}} />
                <Stack.Screen name="Login" component={LoginScreen} options={{gestureDirection: 'vertical'}} />
                <Stack.Screen name="Register" component={RegisterScreen}  options={{gestureDirection: 'vertical'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;