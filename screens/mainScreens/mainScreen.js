import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Divider, List, Text } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";

export default function MainScreen({route, navigation}) {
  const [location, setLocation] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [locationList, setLocationList] = React.useState([]);
  const [lastSelected, setLastSelected] = React.useState([]);
  const user = {
    id: route.params.id,
  };

  useEffect(() => {
    console.log(user.id);
    GetLocationData();
    GetHistoryData();
  }, []);

  const GetLocationData = () => {
    const axiosUrl = `${IP_URL}organization/info`;
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newLocationList = [];
        //console.log(response.data);
        response.data.body.forEach(location => {
          newLocationList.push({value: location._id, label: location.organizationName,
            latitude: location.latitude, longitude: location.longitude});
        });
        setLocationList(newLocationList);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const GetHistoryData = () => {
    const axiosUrl = `${IP_URL}parking-spot?${user.id}`;
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newLastSelected = [];
        console.log(response.data);
        if (response.data.body == undefined) return;
        response.data.body.forEach(reservation => {
          newLastSelected.push({value: reservation._id, parkingLot: reservation.parkingLot, label: reservation.organizationName});
        });
        setLastSelected(newLastSelected);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const RenderLastSelected = () => {
    if (lastSelected.length == 0) return (
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'gray'}}>
          No recent reservations
        </Text>
      </View>);
    else {
      return lastSelected.map((item, index) => (
        <View style={styles.containerRecent}>
          <List.Item
          key={index}
          title={item.parkingLot}
          description={item.label}
          left={props => <List.Icon {...props} icon="history" />}
          right={props => <List.Icon {...props} icon="greater-than" />}
          titleStyle={{fontSize: 16, fontWeight: 'bold'}}
          style={{flexWrap: 'nowrap'}}
        />
        <Divider style={{height: 1, width: "100%" }} bold={false}/>
        </View>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center', height: "30%", justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16, color:'#6563DB'}}>Reservation</Text>
        <Dropdown
          style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={locationList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? 'Select Location' : '...'}
          searchPlaceholder="Search..."
          value={location}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={item => {
            setLocation(item.value);
            setIsFocused(false);
            navigation.navigate('Map', item);
          }}
        />
      </View>
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%', height: '70%'}}>
          {RenderLastSelected()}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerRecent: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '95%',
    marginBottom: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
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
});