import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
 import axios from 'axios';
 import { 
  TextInput,
  Text,
  Button,
  IconButton,
  Divider,
  Snackbar,
} from "react-native-paper";
import Icon from 'react-native-paper/src/components/Icon'


export default function App({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);
  const [customAlert, setCustomAlert] = useState({
    message: "placeHolder",
  });

  useEffect(() => {
    const backAction = () => {
      if (email != "" || password != "" || rol != "" || confirmPassword != "") {
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
  const CheckBeforeBackend = () => {
    if (isClicked == false) {
      setCustomAlert({message: "Terms and conditions must be accepted"}); onToggleSnackBar();
    }
    else if (password != confirmPassword) {
      setCustomAlert({message: "Passwords don't match"}); onToggleSnackBar();
    }
    else{
      SendToBackend();
    }
  }
  const NotImplemented = () => {
    setCustomAlert({message: "Not implemented, oops D:"}); onToggleSnackBar();
  }
  const SendToBackend = () => {
    const data = {
      email: email.toLowerCase(),
      password: password,
      rol: rol.toLowerCase(),
    };
      axios.post('//localhost:3000/user', data,  { withCredentials: true })
      .then(response => {
        // Handle the response data
        console.log(response.data);
        response.data.body.success ? navigation.navigate('Main', {response}) : setCustomAlert({message: response.data.body.message}); onToggleSnackBar(); 
      })
      .catch(error => {
        // Handle any error that occurs during the request
        console.error(error);
        setCustomAlert({message: "One or more fields are empty"}); onToggleSnackBar();
      })
  }

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View style={styles.container}>
        <ScrollView style={styles.focusThis}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar style="auto" />
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
            <TextInput
              style={styles.reducedMarginBtn}
              label='Name'
              mode='outlined'
              onChangeText={(rol) => setRol(rol)}
            />
            <TextInput
              style={styles.reducedMarginBtn}
              label='Email'
              mode='outlined'
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              style={styles.reducedMarginBtn}
              label='Password'
              mode='outlined'
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.reducedMarginBtn}
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
            <Button
              style={styles.button}
              labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
              mode='contained'
              onPress={() => CheckBeforeBackend()}
              width='80%'>
              Next
            </Button>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <Divider style={{ flex: 1, height: 2 }} />
              <Text style={{ marginHorizontal: 10 }}>or</Text>
              <Divider style={{ flex: 1, height: 2 }} />
            </View>
            <Button
              style={styles.reducedMarginBtn}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='google' onPress={() => NotImplemented()}>
              Continue with Google
            </Button>
            <Button
              style={styles.button}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='microsoft' onPress={() => NotImplemented()}>
              Continue with Microsoft
            </Button>
            <Button
              style={styles.button}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='apple' onPress={() => NotImplemented()}>
              Continue with Apple
            </Button>
            <Text style={{marginTop: 25, color: 'black'}} onPress={() => navigation.goBack()}>Cancel</Text>
        </ScrollView>
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
  focusThis: {
      display: "flex",
      flexGrow: 1,
      backgroundColor: "#fff",
      width: "100%",
      height: "100%",
      padding: 10,
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
  button: {
    marginTop: 25, 
    fullWidth: true, 
    width: '70%',
  },
  reducedMarginBtn: {
    marginTop: 15,
    fullWidth: true, 
    width: '70%',
  }
});