import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity, PushNotificationIOS } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
export default function Profile() {
    const dispatch = useDispatch();
    const [posts, user] = useSelector(state => [state.posts, state.user])
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [posts.length])
    console.log('profile posts,' ,posts)
    let data = posts.map(post => post.downloadURL)
    // const hamURL = 'https://i.postimg.cc/wMH6hyZY/ham1.jpg'
    const hamURL = 'https://i.postimg.cc/BQbxBy2b/pngaaa-com-4797789.png'
    
    const [opacity, setOpacity] = useState(0);
    const [opacityPhoto, setOpacityPhoto] = useState(1);
    // data = [...data]
    
    const handleLike = () => {
      console.log(opacity)
      setOpacity(opacity + .05);
      setOpacityPhoto(opacityPhoto - .05);
    }

    const HamImage = () => {
      return (
        <Image
              source={ {uri: hamURL}}
              style={{position: 'absolute', width: 300 , height: 300, opacity: `${opacity}`}} 
          />
      )
    }
    return (
      <View style={styles.background}>
        <Text style={styles.headline_text}>Profile
          <Icon style={{marginLeft: '1rem'}} name="sign-out" type='font-awesome' color='white'/>
        </Text> 
        <Text style={styles.explore_text}>
          Username: {user.name}
        </Text> 
        <Text style={styles.explore_text}>
          Posts: {posts.length}
        </Text> 
        <View>
          <Image
              source={ {uri: 'https://i.insider.com/57800f2288e4a77c708b67ad?width=1000&format=jpeg&auto=webp'}}
              style={{width: 300 , height: 300, opacity: `${opacityPhoto}`}} 
          />
          <HamImage/>
          <FAB 
            placement='left' 
            color='black'
            icon={
              <Icon name="heart" type='font-awesome'
                onPress={handleLike}
                color='red'
              />
            }
          />
        </View>
      </View>
        // <View style={{justifyContent: 'center',alignItems: 'center'}}>

        //     <ImageBackground  source={{uri:hamURL}} style={{height: 600,width: 600}}>

        //             <View>
        //                 <Image
        //                     source={ {uri: 'https://firebasestorage.googleapis.com/v0/b/instah…=media&token=619a157e-96d8-4680-a114-9d41bb3a3331'}}
        //                     style={{width: 600 , height: 600 ,alignItems: 'center',justifyContent: 'center', opacity: `${opacity}`}} 
        //                     onPress={() => {opacity+=.1}}
        //                 />
        //             </View>

        //     </ImageBackground>

        // </View>

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