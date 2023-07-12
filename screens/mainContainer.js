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
    // const navigationItems = [
    //     { key: 'home', title: 'Home', icon: 'home' },
    //     { key: 'agenda', title: 'Agenda', icon: 'calendar'},
    //     { key: 'profile', title: 'Profile', icon: 'account' },
    //     { key: 'settings', title: 'Settings', icon: 'cog' },
    //   ];
    // const sceneMap = {
    //     home: MainScreen,
    //     agenda: AgendaScreen,
    //     profile: ProfileScreen,
    //     settings: SettingsScreen,
    // };
    // const [selectedItem, setSelectedItem] = React.useState(navigationItems[0].key);
    // const renderScreen = BottomNavigation.SceneMap(sceneMap);
    const Tab = createMaterialBottomTabNavigator();
    return(
        <View style={{ flex: 1 }}>
            {/* {renderScreen()}
            <BottomNavigation
            navigationState={{ index: navigationItems.findIndex(item => item.key === selectedItem), routes: navigationItems }}
            onIndexChange={index => setSelectedItem(navigationItems[index].key)}
            renderScene={BottomNavigation.SceneMap(renderScreen)}
            /> */}
            {/* {renderScene}
            <BottomNavigation
                navigationState={{ index: navigationItems.findIndex(item => item.key === selectedItem), routes: navigationItems }}
                onIndexChange={index => setSelectedItem(navigationItems[index].key)}
                renderScene={renderScene} /> */}
            <Tab.Navigator>
            <Tab.Screen name="Home" component={MainScreen} options={{tabBarIcon: 'home'}} />
            <Tab.Screen name="Agenda" component={AgendaScreen} options={{tabBarIcon: 'view-agenda'}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: 'account'}}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: 'cog'}}/>
            </Tab.Navigator>
        </View>
    );
}