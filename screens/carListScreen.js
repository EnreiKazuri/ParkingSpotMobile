import { StatusBar } from "expo-status-bar";
import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB, IconButton, List, Divider, Text } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";
import { useIsFocused } from "@react-navigation/native";

export default function CarListScreen({route, navigation}) {
  const userID = route.params;
  const [carList, setCarList] = React.useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      getCarList();
  }, [isFocused]);

  const getCarList = () => {
    const axiosUrl = `${IP_URL}vehicle/byUser/${userID}`;
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
      const newCarList = [];
      console.log(response.data);
      if (response.data.body == undefined) return;
      response.data.body.forEach(car => {
        newCarList.push({value: car._id, licensePlate: car.plate, maker: car.model.brand.brand, model: car.model.model, color: car.color.color});
      })
      setCarList(newCarList);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const RenderCars = () => {
    if (carList.length == 0) return (
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 50, color:'gray'}}>
          Uh oh... no cars? {userID}
        </Text>
      </View>);
    else {
      return carList.map((item, index) => (
        <View style={styles.containerRecent}>
          <List.Item
          key={index}
          title={item.licensePlate}
          description= {item.color + " " + item.maker + " " + item.model}
          titleStyle={{fontSize: 16, fontWeight: 'bold'}}
          style={{flexWrap: 'nowrap'}}
        />
        <Divider style={{height: 1, width: "100%" }} bold={false}/>
        </View>
      ));
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <StatusBar style="auto" />
      <View style={{height: '5%', backgroundColor: '#fff'}}/>
      <ScrollView style={{height: '80%', backgroundColor: '#fff'}} contentContainerStyle={{alignItems: 'center'}}>
        <Text variant='headlineLarge' style={{fontWeight: 'bold', color: '#6563DB'}}>My Cars</Text>
        {RenderCars()}
      </ScrollView>
      <View style={{justifyContent: 'flex-end', alignItems: 'flex-start', flex: 1, backgroundColor: '#fff'}}>
        <IconButton icon="arrow-left-bold" iconColor='#6563DB' size={70} onPress={() => navigation.goBack()}/>
        <FAB
          icon="car-cog"
          style={styles.fab}
          onPress={() => navigation.navigate('NewCar', {id: userID})}
          size='large'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
  },
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