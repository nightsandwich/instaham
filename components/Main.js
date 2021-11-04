import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'
import FeedScreen from './main/Feed';
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
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} />
            </Tab.Navigator>
        )
    }
}
const mapState = state => ({
    currentUser: state.currentUser
})
const mapDispatch = dispatch => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapState, mapDispatch)(Main)
