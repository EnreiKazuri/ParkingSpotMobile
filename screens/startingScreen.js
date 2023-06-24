import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
} from "react-native";

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-no-background.png")} />
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    loginText: {
        color: "#fff",
        fontWeight: 'bold',
        alignSelf: 'center',
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: '20%',
    width: '95%',
    resizeMode: 'contain',
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: "#6563DB",
    alignItems: "stretch",
  },
});