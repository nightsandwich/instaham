import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts } from '../../redux/actions';
import { Icon } from 'react-native-elements';
import ImageWithHam from './ImageWithHam';

export default function Profile() {
    const dispatch = useDispatch();
    const [posts, user] = useSelector(state => [state.posts, state.user])
    
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [posts.length])
    console.log('profile posts,' ,posts)
    // let data = posts.map(post => post.downloadURL)

    // let allImages = posts.map(post => (
    //   ImageWithHam(post.downloadURL)
    // ))
    // const image = 'https://i.insider.com/57800f2288e4a77c708b67ad?width=1000&format=jpeg&auto=webp'

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
                <ImageBackground
                    source={ {uri: post.downloadURL}}
                    style={{width: 300 , height: 300, opacity: post.opacity}} 
                >
                  <Text style={{fontWeight: 'bold', color: 'white', backgroundColor: 'darkslategrey', textAlign: 'center', marginTop: 150}}>
                    {((1-post.opacity) * 100).toFixed(3)}% Ham
                  </Text>
                </ImageBackground>
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