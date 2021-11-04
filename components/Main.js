import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        // const { currentUser } = this.props;
        // // console.log(currentUser)
        // if(currentUser === undefined) {
        //     return (
        //         <View></View>
        //     )
        // } 
        return (
            <Tab.Navigator initialRouteName="Feed">
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen name="Post" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: ev => { 
                            ev.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons label="Add" name="plus-box" color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
}
const mapState = state => ({
    currentUser: state.currentUser
})
const mapDispatch = dispatch => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapState, mapDispatch)(Main)
