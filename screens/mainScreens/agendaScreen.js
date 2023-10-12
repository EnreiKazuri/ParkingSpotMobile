import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Divider, Text, Menu, Portal, PaperProvider, Modal } from 'react-native-paper'
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import {IP_URL} from "@env";
import { useFocusEffect } from '@react-navigation/native';
import { TimePickerModal} from 'react-native-paper-dates';


export default function AgendaScreen({route}) {
  userId = route.params.id;
  const [reservations, setResevations] = React.useState([]);
  const [currentReservation, setCurrentReservation] = React.useState({});
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [locationX, setLocationX] = React.useState(0);
  const [locationY, setLocationY] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [vis_dateIn, setVis_dateIn] = React.useState(false);
  const [vis_dateOut, setVis_dateOut] = React.useState(false);
  const [dateIn, setDateIn] = React.useState(new Date());
  const [dateOut, setDateOut] = React.useState(new Date());

  const hideMenu = () => setMenuVisible(false);

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
    },
    [setVis_dateOut]
  );

  const toggleModal = () => {
    hideMenu();
    if (visible == false) {
      setDateIn(currentReservation.startHour);
      setDateOut(currentReservation.endHour);
    }
    setVisible(!visible);
  }

  useFocusEffect(
    React.useCallback(() => {
      GetTodayReservations();
    }, [])
  );

  const GetTodayReservations = () => {
    const axiosUrl = `${IP_URL}parking-spot/day/${userId}`;
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newReservations = [];
        //console.log(response.data);
        if (response.data.body == undefined) return;
        response.data.body.forEach(reservation => {
          newReservations.push({value: reservation._id, parking: reservation.parking.parking, parkingID: reservation.parking._id,
          startHour: new Date(reservation.StartTime), endHour: new Date(reservation.EndTime)});
        });
        //console.log(newReservations);
        setResevations(newReservations);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const AbsoluteLayout = (event) => {
    setLocationX(event.nativeEvent.pageX);
    setLocationY(event.nativeEvent.pageY);
  }

  const StartMenu = (reservation) => {
    setCurrentReservation(reservation);
    setMenuVisible(true);
  }

  const DeleteReservation = () => {
    const axiosUrl = `${IP_URL}parking-spot/${currentReservation.value}`;
    axios.delete(axiosUrl, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        GetTodayReservations();
        hideMenu();
    })
    .catch(error => {
      console.error(error);
    })
  }

  const ChangeReservation = () => {
    const newReservation = {
      parking: currentReservation.parkingID,
      StartTime: dateIn,
      EndTime: dateOut,
    };
    console.log(newReservation);
    const axiosUrl = `${IP_URL}parking-spot/${currentReservation.value}`;
    axios.patch(axiosUrl, newReservation, { withCredentials: true })
    .then(response => {
        console.log(response.data);
        GetTodayReservations();
        alert("Reservation Changed");
    })
    .catch(error => {
      console.error(error);
    })
  }

  const RenderReservation = () => {
    if (reservations.length == 0) return (
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'gray'}}>
          No reservations for today
        </Text>
      </View>);
    else {
    return reservations.map((item, index) => (
      <View style={styles.containerRecent} key={index}>
        <List.Item
        key={item.value}
        title={item.parkingLot}
        description= {"Parking No. " + item.parking + "\nfrom " + item.startHour.toLocaleTimeString() + " to " + item.endHour.toLocaleTimeString()}
        titleStyle={{fontSize: 16, fontWeight: 'bold'}}
        style={{flexWrap: 'nowrap'}}
        onPress={() => StartMenu(item)}
      />
      <Divider style={{height: 1, width: "100%" }} bold={false}/>
      </View>
    ));
    }
  };
  return (
    <PaperProvider>
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: 1}}
      onTouchEnd={(e) => AbsoluteLayout(e)}>
      <StatusBar style="auto" />
      {RenderReservation()}
      <Menu
        visible={menuVisible}
        onDismiss={hideMenu}
        anchor={{x: locationX, y: locationY}}>
        <Menu.Item onPress={() => {}} title="Confirm Reservation" />
        <Menu.Item onPress={() => {toggleModal()}} title="Modify Reservation" />
        <Menu.Item onPress={() => {DeleteReservation()}} title="Cancel Reservation" />
      </Menu>
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
          <View style={{flexDirection: 'row',}}>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => toggleModal()}>
              CANCEL
            </Text>
            <View style={{flex: 1, alignItems: 'center'}}/>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => ChangeReservation()}>
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    paddingTop: 35,
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