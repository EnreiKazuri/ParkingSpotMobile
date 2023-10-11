import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, TextInput, Text } from 'react-native-paper';
import {IP_URL} from "@env";
import axios from 'axios';
import { MaskedTextInput } from 'react-native-mask-text';

export default function DetailedMapScreen({ route, navigation }) {
    const id = route.params.user.id;
    const userDriverID = route.params.user.userDriverID;
    const [name, setName] = React.useState(route.params.user.name);
    const [lastName, setLastname] = React.useState(route.params.user.lastname);
    const [phone, setPhone] = React.useState(route.params.user.phone);

    const updateProfile = () => {
      const userDriver = {
        firstName: name,
        lastName: lastName,
        phone: phone,
      }
      console.log(userDriver);
      axiosUrl = `${IP_URL}user-driver/${userDriverID}`;
      console.log(axiosUrl);
      axios.put(axiosUrl, userDriver, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        alert('Profile updated successfully! Changes will be reflected on next login.');
        navigation.navigate('Profile', {id: id});
      })
      .catch(error => {
        console.error(error);
      })
    }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Edit Profile</Text>
      <TextInput
            style={styles.reducedMarginBtn}
            label='Name'
            mode='outlined'
            onChangeText={(name) => setName(name)}
            left={<TextInput.Icon icon="notebook" />}
            defaultValue={name}
        />
        <TextInput
            style={styles.reducedMarginBtn}
            label='Last Name'
            mode='outlined'
            onChangeText={(lastName) => setLastname(lastName)}
            left={<TextInput.Icon icon="notebook" />}
            defaultValue={lastName}
        />
        <TextInput
            style={styles.reducedMarginBtn}
            label='Phone'
            mode='outlined'
            onChangeText={(phone) => setPhone(phone)}
            left={<TextInput.Icon icon="phone" />}
            defaultValue={phone}
            render={props =>
              <MaskedTextInput
                {...props}
                mask="(999) 999-9999"
              />}
        />
        <Button
            style={styles.reducedMarginBtn}
            labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
            mode='contained'
            width='95%'
            onPress={() => updateProfile()}>
            Update Profile
        </Button>
        <IconButton icon="arrow-left-bold" iconColor='#6563DB' style={{alignSelf:'flex-start'}} size={50} onPress={() => navigation.goBack()}/>
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
    reducedMarginBtn: {
        marginTop: 15,
        fullWidth: true, 
        width: '95%',
      },
});