import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FAB, IconButton, List, Divider, Text } from "react-native-paper";
import { I18n } from "i18n-js";
import { translations } from "../localization";
import { useState } from "react";

export default function CarListScreen({ navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const carList = [
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
    {
      value: 1,
      licensePlate: "AAA-111",
      maker: "Toyota",
      model: "Corolla",
      color: "red",
    },
    {
      value: 2,
      licensePlate: "BBB-222",
      maker: "Ford",
      model: "Mustang",
      color: "blue",
    },
    {
      value: 3,
      licensePlate: "CCC-333",
      maker: "Nissan",
      model: "Altima",
      color: "green",
    },
  ];

  const RenderCars = () => {
    return carList.map((item, index) => (
      <View style={styles.containerRecent}>
        <List.Item
          key={index}
          title={item.licensePlate}
          description={item.color + " " + item.maker + " " + item.model}
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
          style={{ flexWrap: "nowrap" }}
        />
        <Divider style={{ height: 1, width: "100%" }} bold={false} />
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ height: "80%", backgroundColor: "#fff" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          variant="headlineLarge"
          style={{ fontWeight: "bold", color: "#6563DB" }}
        >
          {i18n.t("mycars")}
        </Text>
        {RenderCars()}
      </ScrollView>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <IconButton
          icon="arrow-left-bold"
          iconColor="#6563DB"
          size={70}
          onPress={() => navigation.goBack()}
        />
        <FAB
          icon="car-cog"
          style={styles.fab}
          onPress={() => navigation.navigate("NewCar")}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 10,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    padding: 16,
    marginTop: 30,
    backgroundColor: "#fff",
  },
  containerRecent: {
    width: "95%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 5,
  },
});
