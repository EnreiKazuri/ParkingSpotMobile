import React, {useState} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet
} from "react-native";
import { Button } from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps'

export default function ReserverScreen({navigation}){
    const [licensePlate, setLicensePlate] = useState('');
    const [parkingDuration, setParkingDuration] = useState('');
    const [location, setLocation] = useState('');

    const handleReservation = () =>{
        console.log('License Plate:', licensePlate);
        console.log('ParkingDuration', parkingDuration);
        console.log('Location', location);

        setLicensePlate('');
        setParkingDuration('');
        setLocation(null);
    };

    const handleMapPress = (event)=>{
        const{coordinate} = event.nativeEvent;
        setLocation(coordinate);
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
              {location && <Marker coordinate={location} />}
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