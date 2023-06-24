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
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
// import {userController} from '../../parkingSpot/components/user/Controller.js';



export default function App({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
  }, []);
  
  const SendToBackend = () => {
    if(rol == "" || email == "" || password == "") {
      alert("Please fill out all fields")
      return
    }
    else{
      userController.createUser(email, password, rol)
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView style={styles.focusThis}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.titleText}>Create an account</Text>
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Name"
                placeholderTextColor="#2A295C"
                onChangeText={(rol) => setName(rol)}
                />
            </View>
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
            <TouchableOpacity style={styles.loginBtn} onPress={() => SendToBackend() /*navigation.navigate('RegisterDetail')*/}>
                <Text style={styles.loginText} >Create account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fromBottom}>
                <Text style={styles.forgot_button} onPress={() => navigation.goBack()}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    focusThis: {
        display: "flex",
        flexGrow: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        padding: 10,
    },
    titleText: {
        marginBottom: 100,
        fontSize: 20,
        fontWeight: "bold",
    },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow:1,
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
    marginTop: 100,
  },
//   fromBottom: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginBottom: 36
//   },
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