import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import {IP_URL} from "@env";

export default function SignDetailScreen({route, navigation}) {
  let name = route.params.name;
  let email = route.params.email;
  let userID = route.params.id;
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const newUserDriver = () => {
    const userDriver = {
      user: userID,
      firstName: name,
      lastName: lastName,
      phone: phone,
    }
    console.log(userDriver);
    axiosUrl = `${IP_URL}user-driver`;
    console.log(axiosUrl);
    axios.post(axiosUrl, userDriver, { withCredentials: true })
    .then((response) => {
      console.log(response);
      navigation.navigate('Main', {id: userID});
    })
    .catch((error) => {
      console.log(error);
    });
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
        keyboardType='phone-pad'
        // render={props => 
        // <TextInputMask
        //   {...props}
        //   mask="+[00] [000] [000] [000]"/>}
        onChangeText={(phone) => setPhone(phone)}
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