import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, List, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";
import { TimePickerModal} from 'react-native-paper-dates';
import { Dropdown } from 'react-native-element-dropdown';

export default function DetailedMapScreen({route, navigation}) {
  const lotID = route.params.lotId;
  const userID = route.params.userID;
  const orgName = route.params.orgName;
  const lotName = route.params.lotName;
  const carList = route.params.carList;
  const [parkingList, setParkingList] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [vis_dateIn, setVis_dateIn] = React.useState(false);
  const [vis_dateOut, setVis_dateOut] = React.useState(false);
  const [dateIn, setDateIn] = React.useState(new Date());
  const [dateOut, setDateOut] = React.useState(new Date());
  const [parkingId, setParkingId] = React.useState('');
  const [selectedCar, setSelectedCar] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const onDismissIn = React.useCallback(() => {
    setVis_dateIn(false);
  }, [setVis_dateIn]);

  const onDismissOut = React.useCallback(() => {
    setVis_dateOut(false);
  }, [setVis_dateOut]);

  const onConfirmIn = React.useCallback(
    ({ hours, minutes }) => {
      let tempDate = dateIn;
      tempDate.setHours(hours);
      tempDate.setMinutes(minutes);
      tempDate.setSeconds(0,0);
      setDateIn(tempDate);
      setVis_dateIn(false);
      console.log(dateIn);
    },
    [setVis_dateIn]
  );

  const onConfirmOut = React.useCallback(
    ({ hours, minutes }) => {
      let tempDate = dateOut;
      tempDate.setHours(hours);
      tempDate.setMinutes(minutes);
      tempDate.setSeconds(0,0);
      setDateOut(tempDate);
      setVis_dateOut(false);
      console.log(dateOut);
    },
    [setVis_dateOut]
  );

  const toggleModal = () => {
    if (visible == false) {
      let newDate = new Date();
      newDate.setSeconds(0,0);
      setDateIn(newDate);
      setDateOut(newDate);
    }
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

  const reservationTarget = (id) => {
    setParkingId(id);
    toggleModal();
  }

  const ReserveParking = () => {
    const reservation = {
      user: userID,
      parking: parkingId,
      StartTime: dateIn,
      EndTime: dateOut,
    };
    console.log(reservation);
    const axiosUrl = `${IP_URL}parking-spot`
    axios.post(axiosUrl, reservation, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        alert("Parking spot reserved!");
        navigation.navigate('Main', {id: userID});
    })
    .catch(error => {
      console.error(error);
    })
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
        marginBottom: 5, borderColor: 'black', borderWidth: 1}} onPress={() => reservationTarget(item.value)}>
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
        {orgName} - {lotName}
      </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%', height: '70%'}}>
          {RenderParking()}
      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={() => {toggleModal()}} contentContainerStyle={{backgroundColor: 'white', padding: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15, alignSelf:'flex-start', color: 'gray'}}>
            Start time
          </Text>
          <Text 
            variant="displayMedium" 
            onPress={() => setVis_dateIn(true)}
            style={{marginBottom: 15}}>
            {dateIn.toLocaleTimeString()}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15, alignSelf: 'flex-start', color: 'gray'}}>
            End time
          </Text>
          <Text 
            variant="displayMedium" 
            onPress={() => setVis_dateOut(true)}
            style={{marginBottom: 15}}>
            {dateOut.toLocaleTimeString()}
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={carList}
            search
            maxHeight={300}
            labelField="licensePlate"
            valueField="value"
            placeholder={!isFocused ? 'Select Car' : '...'}
            searchPlaceholder="Search..."
            value={selectedCar}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={item => {
              setSelectedCar(item.value);
              setIsFocused(false);
            }}
          />
          <View style={{flexDirection: 'row',}}>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => toggleModal()}>
              CANCEL
            </Text>
            <View style={{flex: 1, alignItems: 'center'}}/>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => ReserveParking()}>
              CONFIRM
            </Text>   
          </View>
          <TimePickerModal
            visible={vis_dateIn}
            onDismiss={onDismissIn}
            onConfirm={onConfirmIn}
            hours={dateIn.getHours()}
            minutes={dateIn.getMinutes()}
            label="Select time"
            cancelLabel="Cancel"
            confirmLabel="Ok"
            animationType="slide"
            locale={'en'} // default
          />
          <TimePickerModal
            visible={vis_dateOut}
            onDismiss={onDismissOut}
            onConfirm={onConfirmOut}
            hours={dateOut.getHours()}
            minutes={dateOut.getMinutes()}
            label="Select time"
            cancelLabel="Cancel"
            confirmLabel="Ok"
            animationType="slide"
            locale={'en'} // default
          />
        </Modal>
      </Portal>
    </View>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '95%',
    marginBottom: 15,
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
});