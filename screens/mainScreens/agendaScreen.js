import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Divider, Text } from 'react-native-paper'
import { StatusBar } from "expo-status-bar";

export default function AgendaScreen() {
  const reservations = [
    { value: 1, parkingLot: "El Sotano", parking: '1', startHour: '10:00', endHour: '11:00'},
    { value: 2, parkingLot: "Parqueo Reservado", parking: '2', startHour: '11:00', endHour: '12:00' },
    { value: 3, parkingLot: "Personal Asignado", parking: '3', startHour: '12:00', endHour: '13:00' },
    { value: 4, parkingLot: "El Desierto", parking: '4', startHour: '13:00', endHour: '14:00'},
    { value: 5, parkingLot: "Parqueo de profesores", parking: '5', startHour: '14:00', endHour: '15:00' },
    { value: 6, parkingLot: "Parqueo de Invitados", parking: '6', startHour: '15:00', endHour: '16:00' },
    { value: 7, parkingLot: "El Sotano", parking: '7', startHour: '16:00', endHour: '17:00'},
    { value: 8, parkingLot: "Parqueo Reservado", parking: '8', startHour: '17:00', endHour: '18:00'},
    { value: 9, parkingLot: "Personal Asignado", parking: '9', startHour: '18:00', endHour: '19:00'},
    { value: 10, parkingLot: "Mundo muy lejano", parking: '10', startHour: '19:00', endHour: '20:00' },
  ];
  const RenderReservation = () => {
    return reservations.map((item, index) => (
      <View style={styles.containerRecent}>
        <List.Item
        key={index}
        title={item.parkingLot}
        description= {"Parking No. " + item.parking + " from " + item.startHour + " to " + item.endHour}
        right={props => <List.Icon {...props} icon="greater-than" />}
        titleStyle={{fontSize: 16, fontWeight: 'bold'}}
        style={{flexWrap: 'nowrap'}}
      />
      <Divider style={{height: 1, width: "100%" }} bold={false}/>
      </View>
    ));
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'flex-start'}}>
      <StatusBar style="auto" />
      {RenderReservation()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    marginTop: 30,
    backgroundColor: '#fff',
  },
  containerRecent: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 5,
  },
});