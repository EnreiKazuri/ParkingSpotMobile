import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 4,
        }}
      >
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          Equipo de trabajo
        </Text>
        <Text variant="headlineSmall" style={{ marginTop: 15 }}>
          Mariano Vásquez, 1087284
        </Text>
        <Text variant="headlineSmall" style={{ marginTop: 15 }}>
          Pablo Diaz, 1096394
        </Text>
        <Text variant="headlineSmall" style={{ marginTop: 15 }}>
          Diego Lobato, 1100999
        </Text>
        <Text variant="headlineSmall" style={{ marginTop: 15 }}>
          Kelvin Marte, 1100945
        </Text>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <IconButton
          icon="arrow-left-bold"
          iconColor="#6563DB"
          size={70}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
