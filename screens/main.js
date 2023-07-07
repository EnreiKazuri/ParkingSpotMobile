import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
  Alert
} from "react-native";

export default function MainScreen({navigation}){
    return(
        <View style ={{flex:1, alignItems:"center",justifyContent:"center"}}>
            <Text>Main Screen</Text>
            <Button title="Reservation" color="#6563DB" onPress={() => navigation.navigate('Reserver')}></Button>
        </View>
    );
}