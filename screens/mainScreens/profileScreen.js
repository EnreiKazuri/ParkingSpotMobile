import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const handleAddCar = () => {
    console.log("Add car");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>Juan</Text>
      <Text style={styles.lastname}>Perez</Text>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Vehicle</Text>
      <Text style={styles.skills}>Honda Civic</Text>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.contact}>Email: example@example.com</Text>
      <Text style={styles.contact}>Phone: 123-456-7890</Text>
      <TouchableOpacity onPress={handleAddCar} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Add Car</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lastname: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  skills: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  contact: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#6463db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
