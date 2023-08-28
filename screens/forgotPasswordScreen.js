import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
// import { Button, TextInput } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function ForgotPassword() {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    //TODO: Perfom password reset logic here.

    //TODO: PlaceHolder logic to show the reset password result
    const resetPasswordSuccesful = email == "diego";
    if (resetPasswordSuccesful) {
      Alert.alert(i18n.t("passwordresetsuccesfull"));
    } else {
      Alert.alert(i18n.t("passwordresetfailed"), i18n.t("invalidemailaddress"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
        {i18n.t("passwordrecovery")}
      </Text>
      <TextInput
        style={styles.button}
        label="Email"
        mode="outlined"
        onChangeText={(email) => setEmail(email)}
      />
      <Button
        style={styles.button}
        icon="exclamation-thick"
        mode="contained"
        buttonColor="black"
        onPress={() => handleResetPassword()}
      >
        {i18n.t("sendemail")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  button: {
    marginTop: 25,
    fullWidth: true,
    width: "90%",
  },
});
