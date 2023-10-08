import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, List, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";
import { TimePickerModal} from 'react-native-paper-dates';

export default function DetailedMapScreen({route, navigation}) {
  const lotID = route.params.lotId;
  const [parkingList, setParkingList] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [vis_dateIn, setVis_dateIn] = React.useState(false);
  const [vis_dateOut, setVis_dateOut] = React.useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    //console.log(lotID);
    getAllParkings();
  }, []);

  const getAllParkings = () => {
    const axiosUrl = `${IP_URL}parking/${lotID}`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newParkingList = [];
        //console.log(response.data.body);
        response.data.body.forEach(parking => {
          newParkingList.push({value: parking._id, basePrice: parking.basePrice, name: parking.parking, parentLot: parking.parkingLot});
        });
        setParkingList(newParkingList);
        //console.log(parkingList);
    }
    )
    .catch(error => {
      console.error(error);
    })
  }


  const ReserveParking = (id) => {
    navigation.navigate("Reservation", {parkingId: id});
  }
  
  const RenderParking = () => {
    if (parkingList.length == 0) return (
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'gray'}}>
          No Parkings available on this Lot
        </Text>
      </View>);
    else {
      parkingSorted = parkingList.sort((a, b) => b.available - a.available);
      return parkingSorted.map((item, index) => (
        <TouchableOpacity style={{width: '90%', minHeight: 150,alignItems: 'center',
        backgroundColor: 'white', borderRadius: 10, padding: 15, justifyContent: 'center',
        marginBottom: 5, borderColor: 'black', borderWidth: 1}} onPress={() => toggleModal()}>
          <Text style={{fontWeight: 'bold', color: 'black', alignSelf: 'center', fontSize: 50}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ));
    }
  }

  return (
    <PaperProvider>
      <View style={{alignItems: 'center', backgroundColor: 'white', flex: 1}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'black'}}>
        INTEC - Parqueo de los profesores
      </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%', height: '70%'}}>
          {RenderParking()}
      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={() => {toggleModal()}} contentContainerStyle={{backgroundColor: 'white', padding: 20, alignItems: 'center'}}>
          <Text onPress={showIn}>{/*dateIn.toLocaleDateString()*/}{dateIn}</Text>
          <Text onPress={showOut}>{/*dateOut.toLocaleDateString()*/}{dateOut}</Text>
        </Modal>
      </Portal>
    </View>
    </PaperProvider>
  );
};