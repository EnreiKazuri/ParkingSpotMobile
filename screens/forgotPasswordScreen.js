import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { IP_URL } from "@env";
import axios from "axios";
// import { Button, TextInput } from "react-native-paper";

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (email === "") {
      Alert.alert("Error", "Please enter your email address");
    } else {
      axiosUrl = `${IP_URL}user/forgot-password`;
      console.log(axiosUrl);
      axios.put(axiosUrl, email,{ withCredentials: true })
      .then(response => {
        console.log(response.data);
        alert('Password reset email sent successfully!');
        navigation.navigate('ResetPassword');
      })
      .catch(error => {
        console.error(error);
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold'}}>Password recovery</Text>
      <TextInput
        style={styles.button}
        label='Email'
        mode='outlined'
        onChangeText={(email) => setEmail(email)}
      />
      <Button
          style={styles.button}
          icon='exclamation-thick'
          mode='contained'
          buttonColor="black"
          onPress={() => handleResetPassword()}>
          Send mail
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  button: {
    marginTop: 25, 
    fullWidth: true, 
    width: '90%',
  },
});