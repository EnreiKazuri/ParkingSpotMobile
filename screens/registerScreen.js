import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text as TextNative,
  View,
  Image,
  TextInput as TextInputNative,
  Button as ButtonNative,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
 import axios from 'axios';
 import { 
  TextInput,
  Snackbar,
  Text,
  Button,
  IconButton,
  Divider,
} from "react-native-paper";


export default function App({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (email != "" || password != "" || rol != "") {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => navigation.goBack()},
        ]);
      }
      else navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);
  
  const SendToBackend = () => {

    const data = {
      email: email,
      password: password,
      rol: rol
      // email: 'n',
      // password: 'n',
      // rol: 'n'
    };
      // const config = {
      //   method: 'post',
      //   url: '//localhost:3000/user'
      // }
    axios.post('//localhost:3000/user', data,  { withCredentials: true })
    .then(response => {
      // Handle the response data
      console.log(response.data);
    })
    .catch(error => {
      // Handle any error that occurs during the request
      console.error(error);
  
    })
  }

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View style={styles.container}>
        <ScrollView style={styles.focusThis}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#6563DB',
                          fontWeight: 'bold',
                          fontSize: 45,
                          }}>
              Register
            </Text>
            <Text style={{marginBottom: 5,
                          color: 'black',
                          fontSize: 20,
                          }}>
              Create an account
            </Text>
            {/* <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Rol"
                value = {rol}
                placeholderTextColor="#2A295C"
                onChangeText={setRol}
                onChange={e => setRol(e.target.value)}
                />
            </View> */}
            <TextInput
              style={{ marginTop: 15, fullWidth: true, width: '70%'}}
              label='Name'
              mode='outlined'
              onChangeText={(rol) => setRol(rol)}
            />
            {/* <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#2A295C"
                onChangeText={setEmail}
                onChange={e => setEmail(e.target.value)}
                />
            </View> */}
            <TextInput
              style={{ marginTop: 15, fullWidth: true, width: '70%'}}
              label='Email'
              mode='outlined'
              onChangeText={(email) => setEmail(email)}
            />
            {/* <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#2A295C"
                secureTextEntry={true}
                onChangeText={setPassword}
                onChange={e => setPassword(e.target.value)}
                />
            </View> */}
            <TextInput
              style={{ marginTop: 15, fullWidth: true, width: '70%'}}
              label='Password'
              mode='outlined'
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TextInput
              style={{ marginTop: 15, fullWidth: true, width: '70%'}}
              label='Confirm Password'
              mode='outlined'
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              secureTextEntry={true}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton 
                icon={isClicked ? 'album' : 'adjust'}
                iconColor={isClicked ? '#6563DB' : 'darkgrey'}
                onPress={handleIconClick}/>
              <Text>Terms and conditions or smth idk lol</Text>
            </View>
            {/* <TouchableOpacity style={styles.loginBtn} onPress={() => SendToBackend()}>
                <Text style={styles.loginText} >Create account</Text>
            </TouchableOpacity> */}
            <Button
              style={{ marginTop: 25, fullWidth: true, width: '70%'}}
              //labelStyle={{fontSize: 15, color: '#fff'}}
              //contentStyle={{height: 50}}
              labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
              mode='contained'
              onPress={() => SendToBackend()}
              width='80%'>
              Next
            </Button>
            {/* <TouchableOpacity style={styles.fromBottom}>
                <Text style={styles.forgot_button} onPress={() => navigation.goBack()}>Cancel</Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <Divider style={{ flex: 1, height: 2 }} />
              <Text style={{ marginHorizontal: 10 }}>or</Text>
              <Divider style={{ flex: 1, height: 2 }} />
            </View>
            <Button
              style={{ marginTop: 15, fullWidth: true, width: '70%'}}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='google'>
              Continue with Google
            </Button>
            <Button
              style={{ marginTop: 25, fullWidth: true, width: '70%'}}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='microsoft'>
              Continue with Microsoft
            </Button>
            <Button
              style={{ marginTop: 25, fullWidth: true, width: '70%'}}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='apple'>
              Continue with Apple
            </Button>
            <Text style={{marginTop: 25, color: 'black'}} onPress={() => navigation.goBack()}>Cancel</Text>
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