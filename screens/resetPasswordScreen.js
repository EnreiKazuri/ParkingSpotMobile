import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
// import { Button, TextInput } from "react-native-paper";
import { Text, TextInput, Button } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function ResetPassword() {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Add logic for reset password

    const passwordResetSuccessful = password === confirmPassword;
    if (passwordResetSuccessful) {
      Alert.alert("Password Reset successful");
    } else {
      Alert.alert("Password Reset Failed", "Passwords do not match");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{i18n.t("resetpassword")}</Text>
      <TextInput
        style={styles.button}
        label={i18n.t("newPassword")}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.button}
        label={i18n.t("confirmpassword")}
        mode="outlined"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
        style={styles.button}
        mode="contained"
        buttonColor="black"
        onPress={() => handleResetPassword()}
      >
        {i18n.t("resetpassword")}
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
