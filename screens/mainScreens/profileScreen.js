import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { List, Divider, Text, Button, Snackbar, Portal, Modal, TextInput, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';
import {IP_URL} from "@env";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({route, navigation}) {
  const [avatar, setAvatar] = useState("");
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  //#region newStuff
    id = route.params.id;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [userDriverID, setUserDriverID] = React.useState('');
    const [activated, setActivated] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [activatedButton, setActivatedButton] = React.useState(false);

    // recreate useEffect using useFocusEffect
    useFocusEffect(
      React.useCallback(() => {
        GetUserData();
        getUserDriverData();
      }, [])
    );

    const toggleModal = () => {
      setVisibleModal(!visibleModal);
    }

    const GetUserData = () => {
        const axiosUrl = `${IP_URL}user/${id}`;
        console.log(axiosUrl);
        axios.get(axiosUrl, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            response.data.body.forEach(user => {
                setEmail(user.email);
                setPassword(user.password);
                setActivated(user.active);
                if (user.active == true) {
                  setActivatedButton(true);
                }
            })
        })
        .catch(error => {
            console.error(error);
        })
    }

    const getUserDriverData = () => {
        const axiosUrl = `${IP_URL}user/info/${id}`;
        console.log(axiosUrl);
        axios.get(axiosUrl, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            response.data.body.forEach(user => {
                setUserDriverID(user._id);
                setName(user.firstName);
                setLastname(user.lastName);
                setPhone(user.phone);
            })
        })
        .catch(error => {
            console.error(error);
        })
    }

    const ActivateUser = () => {
      const axiosUrl = `${IP_URL}user/activate`;
      const data = {
        userId: id,
        token: code,
      }
      console.log(data);
      axios.put(axiosUrl, data, { withCredentials: true })
      .then(response => {
          console.log(response.data);
          alert("Account activated successfully!");
      })
      .catch(error => {
        console.error(error);
      })
    }
  //#endregion

  const editProfile = () => {
    const currentUser = {
      id: id,
      userDriverID: userDriverID,
      name: name,
      lastname: lastname,
      phone: phone,
    }
    navigation.navigate('EditProfile', {user: currentUser});
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
      {/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
      <Icon source="account-circle" color="black" size={70} />
      <Text style={styles.name}>{name + " " + lastname}</Text>
      {/* <Text style={styles.lastname}>Perez</Text> */}
      <Button
        style={styles.button}
        labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
        mode='contained'
        onPress={() => {editProfile()}}
        width='80%'>
        Edit Profile
      </Button>
      <Button
        disabled={activatedButton}
        style={{marginTop: 10, marginBottom: 10}}
        buttonColor='red'
        labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
        mode='contained'
        onPress={() => {toggleModal()}}
        width='80%'>
        {activatedButton ? "Account Activated" : "Activate Account"}
      </Button>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.contact}>{"Email: " + email}</Text>
      <Text style={styles.contact}>{"Phone: " + phone}</Text>
      <View style={styles.separator} />      
      <View style={styles.containerRecent}>
      <List.Item
        key={0}
        title="See my cars"
        left={props => <List.Icon {...props} icon="car" />}
        titleStyle={{fontSize: 16}}
        style={{flexWrap: 'nowrap'}}
        onPress={() => navigation.navigate('CarList', id)}
      />
      <Divider style={{height: 1, width: "100%" }} bold={false}/>
      <List.Item
        key={1}
        title="Settings"
        left={props => <List.Icon {...props} icon="cog" />}
        titleStyle={{fontSize: 16}}
        style={{flexWrap: 'nowrap'}}
        onPress={() => onToggleSnackBar()}
      />
      <Divider style={{height: 1, width: "100%" }} bold={false}/>
      <List.Item
        key={2}
        title="About us"
        left={props => <List.Icon {...props} icon="account-group" />}
        titleStyle={{fontSize: 16}}
        style={{flexWrap: 'nowrap'}}
        onPress={() => navigation.navigate('Settings')}
      />
      <Divider style={{height: 1, width: "100%" }} bold={false}/>
      </View>
      <Portal>
        <Modal visible={visibleModal} onDismiss={() => {toggleModal()}} contentContainerStyle={{backgroundColor: 'white', padding: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15, alignSelf:'flex-start', color: 'gray'}}>
            Activation code
          </Text>
          <TextInput
            label="Code"
            value={code}
            onChangeText={code => setCode(code)}
            mode='outlined'
            style={{marginTop: 25, marginBottom: 35, width: '50%'}}
          />
          <View style={{flexDirection: 'row',}}>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => toggleModal()}>
              CANCEL
            </Text>
            <View style={{flex: 1, alignItems: 'center'}}/>
            <Text style={{flex: 1, color: '#6563DB', fontWeight: 'bold'}}
              onPress={() => ActivateUser()}>
              CONFIRM
            </Text>   
          </View>
        </Modal>
      </Portal>
      <Snackbar 
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: '#D1312A'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon source="alert-circle-outline" color="#fff" size={24} />
          <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>Not available yet</Text>
        </View>
      </Snackbar>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lastname: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  skills: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  contact: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#6463db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerRecent: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 5,
  },
});
