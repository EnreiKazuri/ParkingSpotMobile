import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  TextInput,
  Text,
  Button,
  Snackbar,
  IconButton,
  List,
} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import {IP_URL} from "@env";

export default function NewCarScreen({route, navigation}) {
  const userID = route.params.id;
  const [maker, setMaker] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [licensePlate, setLicensePlate] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [makerList, setMakerList] = React.useState([]);
  const [modelList, setModelList] = React.useState([]);
  const [colorList, setColorList] = React.useState([]);
  const [yearList, setYearList] = React.useState([]);
 
  useEffect(() => {
    GetBrandData();
    GetModelData();
    GetColorData();
    ListYears();
  }, []);

  const GetBrandData = () => {
    const axiosUrl = `${IP_URL}brand`
    console.log(axiosUrl)
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newMakerList = [];
        //console.log(response.data);
        response.data.body.forEach(maker => {
          newMakerList.push({value: maker._id, label: maker.brand});
        });
        setMakerList(newMakerList);
    })
    .catch(error => {
        console.log(error);
    } )
  };

  const GetModelData = () => {
    const axiosUrl = `${IP_URL}model`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        const newModelList = [];
        //console.log(response.data);
        response.data.body.forEach(model => {
          newModelList.push({value: model._id, parentValue: model.brand._id, label: model.model});
        });
        setModelList(newModelList);
    })
    .catch(error => {
        console.log(error);
    } )
  };

  const GetColorData = () => {
    const axiosUrl = `${IP_URL}color`
    axios.get(axiosUrl, { withCredentials: true })
    .then(response => {
        //console.log(response.data);
        const newColorList = [];
        response.data.body.forEach(color => {
          newColorList.push({value: color._id, label: color.color});
        });
        setColorList(newColorList);
    })
    .catch(error => {
        console.log(error);
    } )
  };

  const ListYears = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear)
    const yearArray = [];
    for (let i = 1985; i <= currentYear; i++) {
      yearArray.push({value: i.toString(), label: i.toString()});
    }
    yearArray.reverse();
    setYearList(yearArray);
  };

  const SendToBackend = () => {
      const newCar = {
        owner: userID,
        model: model,
        plate: licensePlate,
        color: selectedColor,
        year: year,
      };
      axiosUrl = `${IP_URL}vehicle`;
      axios.post(axiosUrl, newCar, { withCredentials: true })
      .then(response => {
        // Handle the response data
        console.log(response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
      })

  };

  const handleModel = (value) => {
    let modelArray = [];
    for (let i = 0; i < modelList.length; i++) {
      if (modelList[i].parentValue === value) {
        modelArray.push(modelList[i]);
      }
    }
    setModelData(modelArray);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Registration</Text>
      <Dropdown
          style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={makerList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? 'Select Maker' : '...'}
          searchPlaceholder="Search..."
          value={maker}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={item => {
            setMaker(item.value);
            setIsFocused(false);
            handleModel(item.value);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={modelData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? 'Select Model' : '...'}
          searchPlaceholder="Search..."
          value={model}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={item => {
            setModel(item.value);
            setIsFocused(false);
          }}
        />
        <TextInput
          style={{width:"95%", marginBottom: 15}}
          label='License Plate'
          mode='outlined'
          value={licensePlate}
          onChangeText={text => setLicensePlate(text)}
        />
        <Dropdown
          style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={colorList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? 'Vehicle Color' : '...'}
          value={selectedColor}
          onChange={item => {
            setSelectedColor(item.value);
            setIsFocused(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={yearList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? 'Year' : '...'}
          searchPlaceholder="Search..."
          value={year}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={item => {
            setYear(item.value);
            setIsFocused(false);
          }}
        />
      <Button
        style={styles.reducedMarginBtn}
        labelStyle={{color: '#fff', fontWeight: 'bold', fontSize: 15}}
        mode='contained'
        onPress={() => SendToBackend()}
        width='80%'>
        Done
      </Button>
      <IconButton icon="arrow-left-bold" iconColor='black' style={{alignSelf: 'flex-start'}} size={30} onPress={() => navigation.goBack()}/>
    </View>
  );
}

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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '95%',
    marginBottom: 15,
  },
  dropdown2: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '95%',
    marginBottom: 15,
    marginLeft: 10,
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
  reducedMarginBtn: {
    marginBottom: 10,
    fullWidth: true, 
    width: '95%',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#6563db',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
