import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { List, Divider, Text, Button, Snackbar } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../../localization";

export default function ProfileScreen({ route, navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  const user = {
    name: route.params.name,
    lastname: route.params.lastName,
    email: route.params.email,
    phone: route.params.phone,
    password: route.params.password,
  };

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
      <Icon source="account-circle" color="black" size={70} />
      <Text style={styles.name}>{user.name + " " + user.lastname}</Text>
      {/* <Text style={styles.lastname}>Perez</Text> */}
      <Button
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}
        mode="contained"
        onPress={() => navigation.navigate("EditProfile", user)}
        width="80%"
      >
        {i18n.t("editprofile")}
      </Button>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.contact}>{i18n.t("email") + ": " + user.email}</Text>
      <Text style={styles.contact}>{i18n.t("phone") + ": " + user.phone}</Text>
      <View style={styles.separator} />
      <View style={styles.containerRecent}>
        <List.Item
          key={1}
          title={i18n.t("seecars")}
          left={(props) => <List.Icon {...props} icon="car" />}
          titleStyle={{ fontSize: 16 }}
          style={{ flexWrap: "nowrap" }}
          onPress={() => navigation.navigate("CarList")}
        />
        <Divider style={{ height: 1, width: "100%" }} bold={false} />
        <List.Item
          key={1}
          title={i18n.t("settings")}
          left={(props) => <List.Icon {...props} icon="cog" />}
          titleStyle={{ fontSize: 16 }}
          style={{ flexWrap: "nowrap" }}
          onPress={() => onToggleSnackBar()}
        />
        <Divider style={{ height: 1, width: "100%" }} bold={false} />
        <List.Item
          key={1}
          title={i18n.t("aboutus")}
          left={(props) => <List.Icon {...props} icon="account-group" />}
          titleStyle={{ fontSize: 16 }}
          style={{ flexWrap: "nowrap" }}
          onPress={() => navigation.navigate("Settings")}
        />
        <Divider style={{ height: 1, width: "100%" }} bold={false} />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: "#D1312A" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="alert-circle-outline" color="#fff" size={24} />
          <Text style={{ marginLeft: 10, color: "#fff", fontWeight: "bold" }}>
            {i18n.t("notavaliable")}
          </Text>
        </View>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
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
  containerRecent: {
    width: "95%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 5,
  },
});
