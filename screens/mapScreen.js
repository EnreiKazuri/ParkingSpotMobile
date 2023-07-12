import React, {useState} from "react";
import {
    Text,
    View,
    TextInput,
    Button,
} from "react-native";
// import MapView,{Marker} from 'react-native-maps'

export default function ReserverScreen(){
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
          <View style={{ flex: 1 }}>
            {/* <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 18.48778,
                longitude: -69.96327,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}
            >
              {location && <Marker coordinate={location} />}
            </MapView> */}
          </View>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Reservas</Text>
            <TextInput
              placeholder="License Plate"
              value={licensePlate}
              onChangeText={(text) => setLicensePlate(text)}
              style={{ width: '100%', height: 40, borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <TextInput
              placeholder="Parking Duration"
              value={parkingDuration}
              onChangeText={(text) => setParkingDuration(text)}
              style={{ width: '100%', height: 40, borderWidth: 1, marginBottom: 20, padding: 5 }}
            />
            <Button title="Make Reservation" onPress={handleReservation} color="#6563DB" />
          </View>
        </View>
      );
    };