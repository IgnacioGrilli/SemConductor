import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Icon from 'react-native-ico-material-design';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './Navigation';

const Stack = createNativeStackNavigator();

export default class App extends React.Component { 

/*
  getJsonData = () => {
    fetch('http://if012app.fi.mdn.unp.edu.ar:28001/patentes/all',
    {method: 'GET'}).then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      this.setState({
        data: responseJson
      })
    })
    .catch((error) => {
      console.error(error)
    });
  }
*/

  render () {
    return (
      <Navigation />
    );
  }

}

const styles = StyleSheet.create({
  
  container: {
    margin:1,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: "#00d",
    fontSize: 30,
    padding: 20
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#30b6e6",
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
