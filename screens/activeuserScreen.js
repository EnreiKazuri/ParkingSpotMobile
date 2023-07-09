import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
// import { Button, TextInput } from "react-native-paper";

export default function ActivateUser() {
  const [activationCode, setActivationCode] = useState("");

  const handleActivate = () => {
    // TODO: Send Activation code to server and activate user
    const activeCode = activationCode == "1234";
    if (activeCode) {
      Alert.alert("Activation successful");
    } else {
      Alert.alert("Activation Failed", "Invalid code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activate User</Text>
      <Button title="Activate" onPress={handleActivate} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "#6563db",
    color: "white",
    borderRadius: 5,
    margin: 10,
  },
});
