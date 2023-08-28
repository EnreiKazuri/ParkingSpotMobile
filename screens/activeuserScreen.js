import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
// import { Button, TextInput } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function ActivateUser({ navigation }) {
  const i18n = new I18n(translations);
  const [location, setLocation] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [locationList, setLocationList] = React.useState([]);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [activationCode, setActivationCode] = useState("");

  const handleActivate = () => {
    // TODO: Send Activation code to server and activate user
    const activeCode = activationCode == "1234";
    if (activeCode) {
      Alert.alert(i18n.t("activationsuccesfull"));
    } else {
      Alert.alert(i18n.t("activationfailed"), i18n.t("invalidcode"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("activateuser")}</Text>
      <Button
        style={styles.button}
        mode="contained"
        buttonColor="black"
        onPress={() => handleActivate()}
      >
        {i18n.t("sendactivationcode")}
      </Button>
      <TextInput
        style={styles.button}
        label="Code"
        mode="outlined"
        onChangeText={(activationCode) => setActivationCode(activationCode)}
      />
      <Button
        style={styles.button}
        icon="exclamation-thick"
        mode="contained"
        buttonColor="black"
        onPress={() => handleActivate()}
      >
        {i18n.t("activate")}
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
    width: "80%",
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
    width: "90%",
  },
});
