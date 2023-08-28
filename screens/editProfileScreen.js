import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, TextInput, Text } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function DetailedMapScreen({ route, navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(true);

  const togglePassword = () => setVisible(!visible);
  const result = route.params;
  const user = {
    name: result.name,
    lastname: result.lastname,
    phone: result.phone,
    password: result.password,
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">{i18n.t("editprofile")}</Text>
      <TextInput
        style={styles.reducedMarginBtn}
        label={i18n.t("name")}
        mode="outlined"
        onChangeText={(name) => setName(name)}
        left={<TextInput.Icon icon="notebook" />}
        defaultValue={user.name}
      />
      <TextInput
        style={styles.reducedMarginBtn}
        label={i18n.t("lastname")}
        mode="outlined"
        onChangeText={(lastname) => setLastname(lastname)}
        left={<TextInput.Icon icon="notebook" />}
        defaultValue={user.lastname}
      />
      <TextInput
        style={styles.reducedMarginBtn}
        label={i18n.t("phone")}
        mode="outlined"
        onChangeText={(phone) => setPhone(phone)}
        left={<TextInput.Icon icon="phone" />}
        defaultValue={user.phone}
      />
      <TextInput
        style={styles.reducedMarginBtn}
        label={i18n.t("password")}
        mode="outlined"
        secureTextEntry={visible}
        onChangeText={(password) => setPassword(password)}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" onPress={() => togglePassword()} />}
        defaultValue={user.password}
      />
      <Button
        style={styles.reducedMarginBtn}
        labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}
        mode="contained"
        width="95%"
      >
        {i18n.t("updateprofile")}
      </Button>
      <IconButton
        icon="arrow-left-bold"
        iconColor="#6563DB"
        style={{ alignSelf: "flex-start" }}
        size={50}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  reducedMarginBtn: {
    marginTop: 15,
    fullWidth: true,
    width: "95%",
  },
});
