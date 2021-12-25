import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, Dimensions, Button, TouchableOpacity } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts, editOpacityPost } from '../../redux/actions';
import { Icon } from 'react-native-elements';
import ImageWithHam from './ImageWithHam';
import { getAuth } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { doc, getDoc, getFirestore, getDocs, collection, setDoc } from "firebase/firestore"; 

export default function Profile({navigation}) {
  const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width/3.2;
    const imageWidth = dimensions.width/3.2;

    const dispatch = useDispatch();
    // let [posts, user] = useSelector(state => [state.posts.sort((a,b) => a.opacity > b.opacity ? 1 : -1), state.user])
    let [posts, user] = useSelector(state => [state.allPosts, state.user])
    posts = posts.filter(post => post.userId === user.id)
  
  // const ids = posts.map(post => post.id);
  // const db = getFirestore();
  // const addAvatar = async(id) => {
  //   const postRef = doc(db, 'posts', id);
  //   await setDoc(postRef, { avatar: user.avatar, username: user.name }, { merge: true });
  //   console.log('added')
  // }
  // ids.forEach(id => addAvatar(id));


console.log('loggedin posts', posts)
    const fullHam = posts.filter(post => post.opacity <= 0).length;
  
    
    const hamLevel = (opacity) => {
      return ((1.001 - +opacity) * 100).toFixed(4)
    }
    const renderWithHam = (post) => {
      return (
        <ImageWithHam 
          post={post}
          handleLike={handleLike}
        />
      )
    }
    const handleLike = async(post) => {
      // console.log(opacityPhoto)
      // console.log(opacity)
      console.log(post)
      const newOpacity = post.opacity - .05;
      // const editedPosts = [...posts]; 
      // editedPosts[i].opacity = newOpacity;
      // setPosts(editedPosts)
      // setOpacity((prevOpacity) => prevOpacity + .05);
      // setOpacityPhoto(prevOpacityPhoto => prevOpacityPhoto - .05);
      post.opacity = newOpacity;
      dispatch(editOpacityPost(post.id, newOpacity.toFixed(4)))
    }
    const hamURL = 'https://i.postimg.cc/3NXbCx6s/pngaaa-com-4797789.png'
    const ham = {
      image: require('../../assets/ham.png')
    }
    // const logOut = async() => {
    //   const auth = getAuth();
    //   auth.signOut();
    //   navigation.navigate("Main")
    // }
    return (
      <View style={styles.background}>
        <MaterialCommunityIcons name="arrow-left-bold" color='red' size={60} onPress={()=>navigation.goBack()} style={{marginTop: 10}}/>
        {/* <Text style={styles.headline_text}>Profile
          <Icon  onPress={logOut} style={{marginLeft: 10}} name="sign-out" type='font-awesome' color='red'/>
        </Text>  */}
        <Text style={styles.explore_text}>
          Username: {user.name}
        </Text> 
        <Text style={styles.explore_text}>
          Posts: {posts.length}
        </Text> 
        <Text style={styles.explore_text}>
          Ham: {fullHam}
        </Text> 
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {
              posts.map(post => (
                post.opacity <= 0 ?
                <View key={post.id} style={{backgroundColor: 'black',width: imageWidth, height: imageHeight, margin: 2 }}>
                
                  <ImageBackground source = {ham.image} style={{width: imageWidth, height: imageHeight}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', backgroundColor: 'black', textAlign: 'center', marginTop: imageHeight/2 - 10}}>
                      HAM
                    </Text>
                  </ImageBackground>
                
                </View>
                   :
                <View key={post.id} style={{width: imageWidth, height: imageHeight + 15, margin: 2 }}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('SinglePost', { post: post, renderWithHam: renderWithHam })}
                    >
                  <Image
                      source={ {uri: post.downloadURL}}
                      style={{width: imageWidth , height: imageHeight, opacity: post.opacity}} 
                  />
                  </TouchableOpacity>
                  <Text style={{fontWeight: 'bold', color: 'white', backgroundColor: 'black', textAlign: 'center', fontSize: 10}}>
                    {hamLevel(post.opacity)}% Ham
                  </Text>

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