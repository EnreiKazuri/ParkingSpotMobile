import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  IconButton,
} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import {IP_URL} from "@env";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function NewCarScreen({ navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [maker, setMaker] = React.useState("");
  const [model, setModel] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [isFocused, setIsFocused] = React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [makerList, setMakerList] = React.useState([]);
  // const makerList = [
  //   { value: 1, label: 'Toyota' },
  //   { value: 2, label: 'Ford' },
  //   { value: 3, label: 'Nissan' },
  // ];
  const [modelList, setModelList] = React.useState([]);
  // const modelList = [
  //   { value: 1, label: 'Corolla', parentValue: 1 },
  //   { value: 2, label: 'Mustang', parentValue: 2 },
  //   { value: 3, label: 'Camry', parentValue: 1 },
  //   { value: 3, label: 'Altima', parentValue: 3 },
  //   { value: 3, label: 'Bronco', parentValue: 2 },
  //   { value: 3, label: 'Mirai', parentValue: 1 },
  // ];
  const [colorList, setColorList] = React.useState([]);
  // const colors = [
  //   { value: 1, label: 'Red', color: 'red'},
  //   { value: 2, label: 'Blue', color: 'blue'},
  //   { value: 3, label: 'Green', color: 'green'},
  // ];

  useEffect(() => {
    GetBrandData();
    GetModelData();
    GetColorData();
  }, []);

  const GetBrandData = () => {
    const axiosUrl = `${IP_URL}/brand`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        response.data.body.forEach((maker) => {
          makerList.push({ value: maker._id, label: maker.brand });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetModelData = () => {
    const axiosUrl = `${IP_URL}/model`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        response.data.body.forEach((model) => {
          modelList.push({
            value: model._id,
            parentValue: model.brand._id,
            label: model.model,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetColorData = () => {
    const axiosUrl = `${IP_URL}/color`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        response.data.body.forEach((color) => {
          colorList.push({ value: color._id, label: color.color });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendToBackend = () => { };

  const handleModel = (value) => {
    let modelArray = [];
    for (let i = 0; i < modelList.length; i++) {
      if (modelList[i].parentValue === value) {
        modelArray.push(modelList[i]);
      }
    }
    setModelData(modelArray);
  };

  const handleColor = (value) => {
    setSelectedColor(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("caregister")}</Text>
      <Dropdown
        style={[styles.dropdown, isFocused && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={makerList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? i18n.t("selectmaker") : "..."}
        searchPlaceholder={i18n.t("search")}
        value={maker}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          setMaker(item.value);
          setIsFocused(false);
          handleModel(item.value);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocused && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={modelData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? i18n.t("selectmodel") : "..."}
        searchPlaceholder={i18n.t("search")}
        value={model}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          setModel(item.value);
          setIsFocused(false);
        }}
      />
      <TextInput
        style={{ width: "95%", marginBottom: 15 }}
        label={i18n.t("licenseplate")}
        mode="outlined"
        value={licensePlate}
        onChangeText={(text) => setLicensePlate(text)}
      />
      <Dropdown
        style={[styles.dropdown, isFocused && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={colorList}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? i18n.t("vehicleColor") : "..."}
        value={selectedColor}
        onChange={(item) => {
          setSelectedColor(item.value);
          setIsFocused(false);
          handleColor(item.color);
        }}
      // renderLeftIcon={() => (
      //   <AntDesign color={selectedColor.show} name="pluscircle" size={20} style={{marginRight: 10}}/>
      // )}
      />
      <Button
        style={styles.reducedMarginBtn}
        labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}
        mode="contained"
        onPress={() => SendToBackend()}
        width="80%"
      >
        {i18n.t("done")}
      </Button>
      <IconButton
        icon="arrow-left-bold"
        iconColor="black"
        style={{ alignSelf: "flex-start" }}
        size={30}
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "95%",
    marginBottom: 15,
  },
  dropdown2: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "95%",
    marginBottom: 15,
    marginLeft: 10,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  reducedMarginBtn: {
    marginBottom: 10,
    fullWidth: true,
    width: "95%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#6563db",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
