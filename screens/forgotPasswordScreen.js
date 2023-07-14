import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
// import { Button, TextInput } from "react-native-paper";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    //TODO: Perfom password reset logic here.

    //TODO: PlaceHolder logic to show the reset password result
    const resetPasswordSuccesful = email == "diego";
    if (resetPasswordSuccesful) {
      Alert.alert("Password Reset successful");
    } else {
      Alert.alert("Password Reset Failed", "Invalid email address");
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