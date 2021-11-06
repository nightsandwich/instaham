import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts } from '../../redux/actions';
import { Icon } from 'react-native-elements';

import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, getDocs, collection, setDoc } from "firebase/firestore"; 
export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const [posts, user, allPosts] = useSelector(state => [state.posts.sort((a,b) => a.created < b.created ? 1 : -1), state.user, state.allPosts])
    const opacityVal = posts.reduce((accum, post) => {
      accum += post.opacity;
      return accum;
    }, 0)
    
    const addUserIDtoAll = async() => {
      const db = getFirestore();
      posts.forEach(async (post) => {
        for (let apost of allPosts){
          if (post.id === apost.id){
            //add userid to apost
            const docRef = doc(db, 'posts', post.id);
            await setDoc(docRef, { userId: user.id }, { merge: true })
          }
        }
      })
    }
    useEffect(() => {
      const fetch = async()=> {
        await dispatch(fetchUserPosts())
      };
      fetch();
      // addUserIDtoAll()
        
    }, [])
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [opacityVal])
    
    const hamLevel = (opacity) => {
      return ((1.001 - +opacity) * 100).toFixed(4)
    }
    const hamURL = 'https://i.postimg.cc/3NXbCx6s/pngaaa-com-4797789.png'
    const logOut = async() => {
      const auth = getAuth();
      auth.signOut();
      navigation.navigate("Main")
    }

    return (
      <View style={styles.background}>
        <Text style={styles.headline_text}>Profile
          <Icon style={{margin: 10}} name="sign-out" type='font-awesome' color='white' onPress={logOut}/>
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
                {
                  hamLevel(post.opacity) <= 1 ?(
                    <ImageBackground
                        source={ {uri: post.downloadURL}}
                        style={{width: 290 , height: 290}} 
                    >
                      <Text style={{fontWeight: 'bold', color: 'white', backgroundColor: 'black', textAlign: 'center', marginTop: 150}}>
                        {hamLevel(post.opacity)}% Ham
                      </Text>
                    </ImageBackground>
                  ) :
                  <Image
                    source={ {uri: hamURL}}
                    style={{width: 290 , height: 290}} 
                  />
                }
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