import React, { useState } from "react";
import { View, Alert, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function NewCarScreen() {
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    color: "",
    plate: "",
  });

  const handleInputChange = (field, value) => {
    setCarDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRegisterCar = () => {
    if (
      carDetails.brand === "" ||
      carDetails.model === "" ||
      carDetails.color === "" ||
      carDetails.plate === ""
    ) {
      Alert.alert("Please fill in all the fields");
      return;
    }
    console.log("Car registered:", carDetails);

    setCarDetails({
      brand: "",
      model: "",
      color: "",
      plate: "",
    });

    Alert.alert("Car registered succesfully");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={carDetails.make}
        onChangeText={(text) => handleInputChange("make", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={carDetails.model}
        onChangeText={(text) => handleInputChange("model", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={carDetails.year}
        onChangeText={(text) => handleInputChange("year", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={carDetails.color}
        onChangeText={(text) => handleInputChange("color", text)}
      />
      <Button title="Register Car" onPress={handleRegisterCar} color='#6563db'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
