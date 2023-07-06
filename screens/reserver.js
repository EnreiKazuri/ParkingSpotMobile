import React, {Component, useState,useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Dropdown
} from "react-native";

export default function ReserverScreen(){
const [parking, setParking] = useState('');

const handleChange = (value) =>{
    setParking(value)
}
    return(
        <View style ={styles.container}>
            <Text>Reserver Screen</Text>
            <Dropdown
            items={['Parqueo 1', 'Parqueo 2', 'Parqueo 3']}
            value={parking}
            onChange={handleChange}
            ></Dropdown>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
});