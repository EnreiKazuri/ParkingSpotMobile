import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
// import { Button, TextInput } from "react-native-paper";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Reset Password</Text>
      <TextInput
        style={{ width: "80%", height: 40, borderWidth: 1, marginBottom: 20 }}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={{ width: "80%", height: 40, borderWidth: 1, marginBottom: 20 }}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
}