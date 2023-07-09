import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack, useRouter } from 'expo-router';
import  LoginScreen  from '../screens/loginScreen.js';
import RegisterScreen from '../screens/registerScreen.js';
import StartingScreen from '../screens/startingScreen.js';
import MainContainer from '../screens/mainContainer.js';
import MapScreen from '../screens/mapScreen.js';
import DebugScreen from '../screens/debugScreen.js';
import NewCarScreen from '../screens/newCarScreen.js';
import CarListScreen from '../screens/carListScreen.js';
import DetailedMapScreen from '../screens/detailedMapScreen.js';
import ReservationScreen from '../screens/reservationScreen.js';
import SignDetailScreen from '../screens/signDetScreen.js';
import ActivateUser from '../screens/activeuserScreen.js';
import ForgotPassword from '../screens/forgotPasswordScreen.js';


const App = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();
    return (
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={ { headerShown: false } }>
                    <Stack.Screen name="Starting" component={StartingScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Debug" component={DebugScreen}/>
                    <Stack.Screen name="Main" component={MainContainer}/>
                    <Stack.Screen name="Map" component={MapScreen}/>
                    <Stack.Screen name="NewCar" component={NewCarScreen}/>
                    <Stack.Screen name="CarList" component={CarListScreen}/>
                    <Stack.Screen name="DetailedMap" component={DetailedMapScreen}/>
                    <Stack.Screen name="Reservation" component={ReservationScreen}/>
                    <Stack.Screen name="SignDetail" component={SignDetailScreen}/>
                    <Stack.Screen name = "ActiveUser" component={ActivateUser}/>
                    <Stack.Screen name = "ForgotPassword" component={ForgotPassword}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default App;