import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

const parkings = [
  {id : 1, available: true},
  {id : 2, available: false},
  {id : 3, available: true},
  {id : 4, available: true},
  {id : 5, available: false},
  {id : 6, available: false},
];

const RenderParking = () => {
  parkingSorted = parkings.sort((a, b) => b.available - a.available);
  return parkingSorted.map((item, index) => (
    <View style={{width: '90%', minHeight: 150,alignItems: 'center',
     backgroundColor: item.available ? 'white' : '#e6e1e1', borderRadius: 10, padding: 15,
     marginBottom: 5, borderColor: 'black', borderWidth: 1}} onPress={ReserveParking(item.id)}>
      <Text style={{fontWeight: 'bold', color: 'black', alignSelf: 'flex-start'}}>
        Parking {index + 1}
        </Text>
      <View style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
        <Text style={{color: 'black', alignSelf: 'flex-end', verticalAlign: 'bottom'}}>
          {item.available ? 'Disponible' : 'Ocupado'}
        </Text>
      </View>
    </View>
  ));
}

export default function DetailedMapScreen({navigation}) {
  const ReserveParking = (id) => {
    navigation.navigate("Reservation", {parkingId: id});
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