import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {IP_URL} from "@env";
import axios from 'axios';

import AgendaScreen from './mainScreens/agendaScreen.js';
import ProfileScreen from './mainScreens/profileScreen.js';
import SettingsScreen from './mainScreens/settingsScreen.js';
import MainScreen from './mainScreens/mainScreen.js';

export default function MainContainer({route, navigation}){
    const user = {
        id: route.params._id,
        email: route.params.email,
        password: route.params.password,
        name: "Juan",
        lastname: "Perez",
        phone: "1234567890"
    };


    useEffect(() => {
        console.log(user);
    }, []);

    const GetAllTheData = () => {
        const axiosUrl = `${IP_URL}user/userInfo/${user.id}`;
        axios.get(axiosUrl, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const Tab = createMaterialBottomTabNavigator();
    return(
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
            <Tab.Screen name="Home" component={MainScreen} options={{tabBarIcon: 'home'}} 
            initialParams={{name: user.name}}/>
            <Tab.Screen name="Agenda" component={AgendaScreen} options={{tabBarIcon: 'view-agenda'}}
            initialParams={{name: user.name}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: 'account'}}
            initialParams={{name: user.name, lastName: user.lastname, email: user.email, phone: user.phone, password: user.password, id: user.id}}/>
            </Tab.Navigator>
        </View>
    );
}