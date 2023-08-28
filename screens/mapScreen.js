import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";

export default function ReserverScreen({ navigation }) {
  const i18n = new I18n(translations);
  let [locale, setLocale] = useState(Localization.locale);
  i18n.defaultLocale = "en";
  i18n.locale = locale;
  i18n.enableFallback = true;
  const [licensePlate, setLicensePlate] = useState("");
  const [parkingDuration, setParkingDuration] = useState("");
  const [location, setLocation] = useState("");
  const [markerList, setMarkerList] = useState([]);
  const locationID = "64b17c3c40102dc7689d776e";

  useEffect(() => {
    GetMarkers();
  }, []);

  const GetMarkers = () => {
    const generalUrl = "http://localhost:3000/organization/info";
    const androidUrl =
      "http://192.168.43.36:3000/parking-lot?64b17c3c40102dc7689d776e";
    const axiosUrl = Platform.OS === "android" ? androidUrl : generalUrl;
    axios
      .get(axiosUrl, { withCredentials: true })
      .then((response) => {
        const newMarkerList = [];
        console.log(response.data);
        response.data.body.forEach((marker) => {
          newMarkerList.push({
            value: marker._id,
            latitude: marker.latitude,
            longitude: marker.longitude,
          });
        });
        setMarkerList(newMarkerList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
  };

  const openLot = () => {
    navigation.navigate("DetailedMap");
  };

  const printMarkers = () => {
    return markerList.map((item, index) => (
      <Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        onPress={openLot}
      />
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 18.48778,
            longitude: -69.96327,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          }}
          onPress={handleMapPress}
        >
          {/* {location &&  */}
          {/* <Marker coordinate={{
                latitude: 18.48778,
                longitude: -69.96327,
              }}
              onPress={openLot}/> */}
          {printMarkers()}
        </MapView>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={styles.reducedMarginBtn}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          {i18n.t("cancel")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reducedMarginBtn: {
    marginTop: 15,
    fullWidth: true,
    width: "70%",
    backgroundColor: "black",
  },
});
