import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {IP_URL} from "@env";
import axios from 'axios';

import AgendaScreen from './mainScreens/agendaScreen.js';
import ProfileScreen from './mainScreens/profileScreen.js';
import MainScreen from './mainScreens/mainScreen.js';

export default function MainContainer({route, navigation}){
    const id = route.params.id;

    const Tab = createMaterialBottomTabNavigator();
    return(
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
            <Tab.Screen name="Home" component={MainScreen} options={{tabBarIcon: 'home'}} 
            initialParams={{id: id}}/>
            <Tab.Screen name="Agenda" component={AgendaScreen} options={{tabBarIcon: 'view-agenda'}}
            initialParams={{id: id}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: 'account'}}
            initialParams={{id: id}}/>
            </Tab.Navigator>
        </View>
    );
}