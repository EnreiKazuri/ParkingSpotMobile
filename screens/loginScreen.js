import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  //Text,
  View,
  Image,
  TextInput as TextInputNative,
  //Button,
  TouchableOpacity,
  BackHandler,
  Alert,
  FlatList
} from "react-native";
import { TextInput,
  Snackbar,
  Text,
  Button,
} from "react-native-paper";
import Icon from 'react-native-paper/src/components/Icon'
// import { useSnackbar } from "notistack";
//import { Alert as SnackAlert, Snackbar } from '@mui/material';
import axios from 'axios';

export default function App({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);
  // const { enqueueSnackbar } = useSnackbar();
  const [customAlert, setCustomAlert] = useState({
    severity: "error",
    message: "placeHolder",
  });

  useEffect(() => {
    const backAction = () => {
      // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => navigation.goBack()},
      // ]);
      navigation.goBack();
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
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };
    axios.post('//localhost:3000/user/login', data,  { withCredentials: true })
    .then(response => {
      // Handle the response data
      console.log(response.data);
      response.data.body.success ? navigation.navigate('Main', {response}) : setCustomAlert({severity: "error", message: response.data.body.message}); onToggleSnackBar(); 
    })
    .catch(error => {
      // Handle any error that occurs during the request
      console.error(error);
      setCustomAlert({severity: "error", message: "One or more fields are empty"}); onToggleSnackBar();
    })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/parkingspot_crop_logo.png")} />
      <StatusBar style="auto" />
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#2A295C"
          onChangeText={(email) => setEmail(email)}
        />
      </View> */}
      <TextInput
        style={{ marginTop: 15, fullWidth: true, width: '70%'}}
        label='Email'
        mode='outlined'
        onChangeText={(email) => setEmail(email)}
        />
      
      {/* <View style={styles.inputView}>
        <TextInputNative
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#2A295C"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View> */}
      <TextInput
        style={{ marginTop: 15, fullWidth: true, width: '70%'}}
        label='Password'
        mode='outlined'
        onChangeText={(password) => setPassword(password)}
        />
      {/* <TouchableOpacity>
        {/* <Text style={styles.forgot_button} onPress to recover  >Forgot Password?</Text>
       </TouchableOpacity> */}
      <Text style={{marginTop: 15, color: '#6563DB'}}>Forgot Password?</Text>
      {/* <TouchableOpacity style={styles.loginBtn} onPress={() => SendToBackend()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity> */}
      <Button
          style={{ marginTop: 15, fullWidth: true, width: '70%'}}
          //labelStyle={{fontSize: 15, color: '#fff'}}
          //contentStyle={{height: 50}}
          mode='contained'
          onPress={() => SendToBackend()}
          width='80%'
          >
          Log in
        </Button>
        <Text style={{marginTop: 15}}>Don't have an account? 
          <Text style={{marginTop: 15, color: '#6563DB'}} onPress={() => navigation.navigate('Register')}> Create account</Text>
        </Text>
        <Snackbar 
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{ backgroundColor: '#D1312A'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon source="alert-circle-outline" color="#fff" size={24} />
            <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>{customAlert.message}</Text>
          </View>
        </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
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
    marginTop: 15,
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