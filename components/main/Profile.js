import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts } from '../../redux/actions';
import { Icon } from 'react-native-elements';
import ImageWithHam from './ImageWithHam';

export default function Profile() {
    const dispatch = useDispatch();
    const [posts, user] = useSelector(state => [state.posts.sort((a,b) => a.created < b.created ? 1 : -1), state.user])
    const opacityVal = posts.reduce((accum, post) => {
      accum += post.opacity;
      return accum;
    }, 0)
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [])
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [opacityVal])
    
    const hamLevel = (opacity) => {
      return ((1.001 - +opacity) * 100).toFixed(4)
    }

    return (
      <View style={styles.background}>
        <Text style={styles.headline_text}>Profile
          <Icon style={{marginLeft: 10}} name="sign-out" type='font-awesome' color='white'/>
        </Text> 
        <Text style={styles.explore_text}>
          Username: {user.name}
        </Text> 
        <Text style={styles.explore_text}>
          Posts: {posts.length}
        </Text> 
        <ScrollView>
          <View
            style={{marginTop: 10}}
          >
            {
              posts.map(post => (
                <View style={{border: 5, borderColor: 'white', borderStyle: 'solid', width: 300, height: 300}}>
                <ImageBackground
                    source={ {uri: post.downloadURL}}
                    style={{width: 290 , height: 290}} 
                >
                  <Text style={{fontWeight: 'bold', color: 'white', backgroundColor: 'black', textAlign: 'center', marginTop: 150}}>
                    {hamLevel(post.opacity)}% Ham
                  </Text>
                </ImageBackground>
                </View>
              ))
            }
          </View>
          
        </ScrollView>
          {/* <GridImageView data={data} /> */}
      </View>

//GRIDIMAGEVIEWER
        // <View style={styles.background}>
        //     <Text style={styles.headline_text}>Profile</Text>         
        //         <GridImageView data={data} />
        //         {/* <GridImageView data={ham} style={{position: 'absolute'}} /> */}
        // </View>
    )
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: 'black',
      flex: 1
    },
    headline_text: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      marginLeft: 20
    },
    explore_text: {
      marginTop: 5,
      marginBottom: 10,
      color: 'white',
      marginLeft: 20,
      fontSize: 12,
      fontWeight: '600'
    },
  });