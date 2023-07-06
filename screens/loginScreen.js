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
import axios from 'axios';

export default function App({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.goBack()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const SendToBackend = () => {

    const data = {
      email: email,
      password: password,
    };
    axios.post('//localhost:3000/user/login', data,  { withCredentials: true })
    .then(response => {
      // Handle the response data
      console.log(response.data);
      response.data.body.success ? navigation.navigate('Register', {response}) : alert(response.data.body.message);
    })
    .catch(error => {
      // Handle any error that occurs during the request
      console.error(error);
  
    })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/parkingspot_crop_logo.png")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#2A295C"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#2A295C"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button} /*onPress to recover password*/>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} /*onPress to mainScreen*/ onPress={() => SendToBackend()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
        <Text>Don't have an account? 
          <Text style={styles.forgot_button} onPress={() => navigation.navigate('Register')}> Create account</Text>
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputView: {
    backgroundColor: "#AAA9E1",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "stretch",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  forgot_button: {
    height: 20,
    marginBottom: 20,
    color: "#6563DB",
  },
  loginText: {
    color: "#fff",
    fontWeight: 'bold',
},
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: "#6563DB",
  },
});