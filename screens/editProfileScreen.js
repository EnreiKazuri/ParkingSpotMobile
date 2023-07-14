import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, TextInput, Text } from 'react-native-paper';

export default function DetailedMapScreen({ route, navigation }) {
    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    const togglePassword = () => setVisible(!visible);
    const result = route.params;
    const user = {
        name: result.name,
        lastname: result.lastname,
        phone: result.phone,
        password: result.password,
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
            defaultValue={user.name}
        />
        <TextInput
            style={styles.reducedMarginBtn}
            label='Last Name'
            mode='outlined'
            onChangeText={(lastname) => setLastname(lastname)}
            left={<TextInput.Icon icon="notebook" />}
            defaultValue={user.lastname}
        />
        <TextInput
            style={styles.reducedMarginBtn}
            label='Phone'
            mode='outlined'
            onChangeText={(phone) => setPhone(phone)}
            left={<TextInput.Icon icon="phone" />}
            defaultValue={user.phone}
        />
        <TextInput
            style={styles.reducedMarginBtn}
            label='Password'
            mode='outlined'
            secureTextEntry = {visible}
            onChangeText={(password) => setPassword(password)}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon="eye" onPress={() => togglePassword()}/>}
            defaultValue={user.password}
        />
        <Button
            style={styles.reducedMarginBtn}
            labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
            mode='contained'
            width='95%'>
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