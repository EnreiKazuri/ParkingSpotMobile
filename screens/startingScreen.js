import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Button } from 'react-native-paper';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-no-background.png")} />
        <StatusBar style="auto" />
        <Button
          style={styles.button}
          icon='send'
          mode='contained'
          onPress={() => navigation.navigate('Login')}
          width='80%'>
            Log in
        </Button>
        <Button
          style={styles.button}
          icon='send'
          mode='contained'
          onPress={() => navigation.navigate('Register')}
          >Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: '20%',
    width: '95%',
    resizeMode: 'contain',
  },
  button: {
    marginTop: 25, 
    fullWidth: true, 
    width: '70%',
  }
});