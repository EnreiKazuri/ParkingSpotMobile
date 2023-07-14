import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AgendaScreen from './mainScreens/agendaScreen.js';
import ProfileScreen from './mainScreens/profileScreen.js';
import SettingsScreen from './mainScreens/settingsScreen.js';
import MainScreen from './mainScreens/mainScreen.js';

export default function MainContainer(){
    const Tab = createMaterialBottomTabNavigator();
    return(
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
            <Tab.Screen name="Home" component={MainScreen} options={{tabBarIcon: 'home'}} />
            <Tab.Screen name="Agenda" component={AgendaScreen} options={{tabBarIcon: 'view-agenda'}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: 'account'}}/>
            </Tab.Navigator>
        </View>
    );
}