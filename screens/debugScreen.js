import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import { Button, Snackbar, Text } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon'

export default function MainScreen({navigation}){
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);
    return(
        <ScrollView style ={{flex:1}} contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <StatusBar style="auto" />
            <View style={{width:'50%', alignItems: 'center'}}>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('Starting')} >
                Start
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('Login')}>
                Log In
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('Register')}>
                Sign Up
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='darkred'
                icon='window-close'
                mode='contained'
                onPress={() => navigation.navigate('SignDetail')}>
                Sign Details
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('NewCar')}>
                New Car
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('Main')}>
                Dashboard
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='darkorange'
                icon='alert-outline'
                mode='contained'
                onPress={() => onToggleSnackBar()}>
                Settings
            </Button>
            </View>
            <View style={{width:'50%', alignItems: 'center'}}>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='darkred'
                icon='window-close'
                mode='contained'
                onPress={() => navigation.navigate('Map')}>
                Map Screen
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='darkred'
                icon='window-close'
                mode='contained'
                onPress={() => navigation.navigate('DetailedMap')}>
                Detailed Map
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='darkred'
                icon='window-close'
                mode='contained'
                onPress={() => navigation.navigate('Reservation')}>
                Reservation Det
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('ProfileView')}>
                Profile View
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => onToggleSnackBar()}>
                Agenda
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('CarList')}>
                Car list
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('ActiveUser')}>
                Activate User
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password
            </Button>
            <Button
                style={styles.reducedMarginBtn}
                buttonColor='green'
                icon='check-bold'
                mode='contained'
                onPress={() => navigation.navigate('ResetPassword')}>
                Reset Password
            </Button>
            </View>
            <Snackbar 
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{ backgroundColor: '#D1312A'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon source="alert-circle-outline" color="#fff" size={24} />
                    <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>Not available yet</Text>
                </View>
            </Snackbar>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    reducedMarginBtn: {
      marginTop: 50,
      fullWidth: true, 
      width: '90%',
    }
  });