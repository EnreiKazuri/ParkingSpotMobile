import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

export default function MainScreen(){
    return(
        <View style ={{flex:1, alignItems:"center",justifyContent:"center"}}>
            <Text>Main Screen</Text>
            <Button title="Reservation" color="#6563DB"></Button>
        </View>
    );
}