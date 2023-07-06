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
    };
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
              onPress={() => SendToBackend()}
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
              icon='google'>
              Continue with Google
            </Button>
            <Button
              style={styles.button}
              labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
              mode='outlined'
              icon='microsoft'>
              Continue with Microsoft
            </Button>
            <Button
              style={styles.button}
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