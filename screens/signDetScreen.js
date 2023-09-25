import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { en, es, registerTranslation, DatePickerModal } from 'react-native-paper-dates';
import axios from 'axios';
import {IP_URL} from "@env";

export default function SignDetailScreen({route, navigation}) {
  registerTranslation('es', es);
  registerTranslation('en', en);
  let name = route.params.name;
  let email = route.params.email;
  let userID = route.params.id;
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const newUserDriver = () => {
    const userDriver = {
      user: userID,
      name: "name",
      lastName: lastName,
      //phone: phone,
      birthDate: "03/12/2001",
    }
    console.log(userDriver);
    axiosUrl = `${IP_URL}userDriver`;
    axios.post(axiosUrl, userDriver, { withCredentials: true })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    //navigation.navigate(); 
  }
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
      <Text variant='headlineLarge' style={{fontWeight: 'bold', color: 'black'}}>Tell us more about you, {name}</Text>
      <TextInput
        style={{width:"95%", marginBottom: 15}}
        label={name}
        mode='outlined'
        disabled
      />
      <TextInput
        style={{width:"95%", marginBottom: 15}}
        label='Last Name'
        mode='outlined'
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <TextInput
        style={{width:"95%", marginBottom: 15}}
        label={email}
        mode='outlined'
        disabled
      />
      <TextInput
        style={{width:"95%", marginBottom: 15}}
        label='Phone Number'
        mode='outlined'
        onChangeText={(phone) => setPhone(phone)}
      />
      <Button 
        style={{width:"95%", marginBottom: 15}}
        onPress={() => setOpen(true)} 
        uppercase={false} 
        mode="outlined">
          Fecha de nacimiento
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          presentationStyle='pageSheet'
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      <Button
        style={{width:"95%", marginBottom: 15}}
        mode='contained'
        onPress={() => newUserDriver()}>
          Continue
        </Button>
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