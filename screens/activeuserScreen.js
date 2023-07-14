import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
// import { Button, TextInput } from "react-native-paper";

export default function ActivateUser({navigation}) {
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
      <Button
          style={styles.button}
          mode='contained'
          buttonColor="black"
          onPress={() => handleActivate()}>
          Send Activation Code
      </Button>
      <TextInput
        style={styles.button}
        label='Code'
        mode='outlined'
        onChangeText={(activationCode) => setActivationCode(activationCode)}
      />
      <Button
          style={styles.button}
          icon='exclamation-thick'
          mode='contained'
          buttonColor="black"
          onPress={() => handleActivate()}>
          Activate
      </Button>
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
    marginBottom: 10,
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
    borderRadius: 5,
    margin: 10,
    width: '90%',
  },
});
