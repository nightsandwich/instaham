import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxDzSjb4nl93A-HgF5Rm18iYjWW4LE_28",
  authDomain: "instaham-dev.firebaseapp.com",
  projectId: "instaham-dev",
  storageBucket: "instaham-dev.appspot.com",
  messagingSenderId: "653149159747",
  appId: "1:653149159747:web:8ecfff4e575e9f4d53eff6",
  measurementId: "G-7PERENF8ZT"
};

const app = initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();
const auth = getAuth();
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }

  componentDidMount(){
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        //User is signed out
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        //User is signed in
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>
          User is logged in.
        </Text>
      </View>
    ) 
  }
}

