import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";
import React, { useState } from "react";

export default function App({ navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "es-US";
  i18n.locale = locale;
  i18n.enableFallback = true;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/logo-no-background.png")}
      />
      <StatusBar style="auto" />
      <Button
        style={styles.button}
        buttonColor="#6563DB"
        icon="send"
        mode="contained"
        onPress={() => navigation.navigate("Login")}
        width="80%"
      >
        {i18n.t("login")}
      </Button>
      <Button
        style={styles.button}
        icon="send"
        mode="contained"
        buttonColor="#6563DB"
        onPress={() => navigation.navigate("Register")}
      >
        {i18n.t("signup")}
      </Button>
      <Button
        style={{ marginTop: 25, fullWidth: true, width: "70%" }}
        buttonColor="black"
        icon="cog"
        mode="contained"
        onPress={() => navigation.navigate("Debug")}
      >
        Debug
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: "20%",
    width: "95%",
    resizeMode: "contain",
  },
  button: {
    marginTop: 25,
    fullWidth: true,
    width: "70%",
  },
});
