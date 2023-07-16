import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Divider, List, Text } from 'react-native-paper';

export default function MainScreen({navigation}) {
  const [location, setLocation] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const locationList = [
    { value: 1, label: 'Instituto Tecnologico de Santo Domingo' },
    { value: 2, label: 'Banco Popular' },
    { value: 3, label: 'La casa de Pablo' },
  ];
  
  const lastSelected = [
    { value: 1, parkingLot: "El Sotano", label: 'Instituto Tecnologico de Santo Domingo'},
    { value: 2, parkingLot: "Parqueo Reservado", label: 'Banco Popular' },
    { value: 3, parkingLot: "Personal Asignado", label: 'La casa de Pablo' },
    { value: 4, parkingLot: "El Desierto", label: 'Instituto Tecnologico de Santo Domingo'},
    { value: 5, parkingLot: "Parqueo de profesores", label: 'Instituto Tecnologico de Santo Domingo' },
    { value: 6, parkingLot: "Parqueo de Invitados", label: 'La casa de Pablo' },
    { value: 7, parkingLot: "El Sotano", label: 'Instituto Tecnologico de Santo Domingo'},
    { value: 8, parkingLot: "Parqueo Reservado", label: 'Banco Popular' },
    { value: 9, parkingLot: "Personal Asignado", label: 'La casa de Pablo' },
    { value: 10, parkingLot: "Mundo muy lejano", label: 'Por donde Abel' },
  ];
  const conditionalNavigate = () => {
    if (location == 2) navigation.navigate('Map');
  };
  const RenderLastSelected = () => {
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
            conditionalNavigate();
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