import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";

export default function DetailedMapScreen({route, navigation}) {
  const lotID = route.params.lotId;
  const [parkingList, setParkingList] = useState([]);

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
        <View style={{width: '90%', minHeight: 150,alignItems: 'center',
        backgroundColor: item.available ? 'white' : '#e6e1e1', borderRadius: 10, padding: 15,
        marginBottom: 5, borderColor: 'black', borderWidth: 1}} onPress={() => ReserveParking(item.id)}>
          <Text style={{fontWeight: 'bold', color: 'black', alignSelf: 'flex-start'}}>
            {item.name}
          </Text>
          <View style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={{color: 'black', alignSelf: 'flex-end', verticalAlign: 'bottom'}}>
              {item.available ? 'Disponible' : 'Ocupado'}
            </Text>
          </View>
        </View>
      ));
    }
  }

  return (
    <View style={{alignItems: 'center', backgroundColor: 'white', flex: 1}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'black'}}>
        INTEC - Parqueo de los profesores
      </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%', height: '70%'}}>
          {RenderParking()}
        </ScrollView>
    </View>
  );
};