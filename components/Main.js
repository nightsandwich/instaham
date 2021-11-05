import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { connect } from 'react-redux';
import { fetchUser, fetchUserPosts, fetchAllPosts } from '../redux/actions/index'

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchAllPosts();
    }
    render() {
        // const { currentUser } = this.props;
        // // console.log(currentUser)
        // if(currentUser === undefined) {
        //     return (
        //         <View></View>
        //     )
        // } 
        console.log('PROPS  ', this.props)
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
    user: state.user,
    posts: state.props,
    allPosts: state.allPosts
})
const mapDispatch = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchUserPosts: () => dispatch(fetchUserPosts()),
    fetchAllPosts: () => dispatch(fetchAllPosts())
})


export default connect(mapState, mapDispatch)(Main)
