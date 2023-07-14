import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
// import { Button, TextInput } from "react-native-paper";
import { Text, TextInput, Button } from "react-native-paper";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Add logic for reset password

    const passwordResetSuccessful = password === confirmPassword;
    if (passwordResetSuccessful) {
      Alert.alert("Password Reset successful");
    } else {
      Alert.alert("Password Reset Failed", "Passwords do not match");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Reset Password</Text>
      <TextInput
        style={styles.button}
        label='New Password'
        mode='outlined'
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.button}
        label='Confirm Password'
        mode='outlined'
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
          style={styles.button}
          mode='contained'
          buttonColor="black"
          onPress={() => handleResetPassword()}>
          Reset Password
      </Button>
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
  button: {
    marginTop: 25, 
    fullWidth: true, 
    width: '90%',
  },
});