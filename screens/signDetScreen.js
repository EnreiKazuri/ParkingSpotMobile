import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function SignDetailScreen({route, navigation}) {
  let name = route.params.name;
  let email = route.params.email;
  let password = route.params.password;
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const sendToProfile = () => {
    navigation.navigate('Main', {name: name, lastName: lastName, email: email, phone: phone, password: password}); 
  }
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
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
        mode='contained'
        onPress={() => sendToProfile()}>
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