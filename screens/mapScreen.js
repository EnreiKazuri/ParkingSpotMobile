import React, {useEffect, useState} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet
} from "react-native";
import { Button } from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps'
import axios from 'axios';
import {IP_URL} from "@env";

export default function ReserverScreen({navigation, route}){
    // const [licensePlate, setLicensePlate] = React.useState('');
    // const [parkingDuration, setParkingDuration] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [markerList, setMarkerList] = useState([]);
    const locationSelected = {
      locationID : route.params.value,
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    };
    
    useEffect(() => {
      console.log(locationSelected)
      GetMarkers();
    }, []);

    const GetMarkers = () => {
      const axiosUrl = `${IP_URL}parking-lot?${locationSelected.locationID}`;
      axios.get(axiosUrl, { withCredentials: true })
      .then(response => {
          const newMarkerList = [];
          response.data.body.forEach(marker => {
            newMarkerList.push({value: marker._id, latitude: marker.latitude, longitude: marker.longitude});
          });
          setMarkerList(newMarkerList);
      }
      )
      .catch(error => {
        console.error(error);
      })
    }

    const handleMapPress = (event)=>{
      const{coordinate} = event.nativeEvent;
      setLocation(coordinate);
    };

    const openLot = (lotId) => {
      navigation.navigate("DetailedMap", {lotId: lotId});
    };

    const printMarkers = () => {
      return markerList.map((item, index) => (
        <Marker key={index} coordinate={{
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),}}
          onPress={() => openLot(item.value)}
        />
      ));}

    return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: parseFloat(locationSelected.latitude),
                longitude: parseFloat(locationSelected.longitude),
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
              }}
              onPress={handleMapPress}
            >
              {printMarkers()}
            </MapView>
          </View>
          <View style={{ flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
            <Button
            style={styles.reducedMarginBtn}
            mode='contained'
            onPress={() => navigation.goBack()}>
              Cancel
            </Button>
          </View>
        </View>
      );
    };

const styles = StyleSheet.create({
  reducedMarginBtn: {
    marginTop: 15,
    fullWidth: true, 
    width: '70%',
    backgroundColor: 'black'
  }
});