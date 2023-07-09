import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold'}}>Forgot Password</Text>
      <TextInput
        style={{ width: '80%', height: 40, borderWidth: 1, marginBottom: 20 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};
