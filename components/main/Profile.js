import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { fetchUserPosts } from '../../redux/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(fetchUserPosts())
    }, [posts.length])
    console.log('profile posts,' ,posts)
    let data = posts.map(post => post.downloadURL)
    const hamURL = 'https://i.postimg.cc/wMH6hyZY/ham1.jpg'
    // const hamOver = (img) => {
    //     return (
            
    //     )
    // }
    // data = [...data, 'https://imgur.com/a/yT2LlLG']
    data = [...data]
    console.log(data)
    const ham = Array(posts.length - 1).fill(hamURL)
    let opacity = 1;
    return (
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

            <ImageBackground  source={{uri:hamURL}} style={{height: 600,width: 600}}>

                    <View>
                        <Image
                            source={ {uri: 'https://firebasestorage.googleapis.com/v0/b/instah…=media&token=619a157e-96d8-4680-a114-9d41bb3a3331'}}
                            style={{width: 600 , height: 600 ,alignItems: 'center',justifyContent: 'center', opacity: `${opacity}`}} 
                            onPress={() => {opacity+=.1}}
                        />
                    </View>

            </ImageBackground>

        </View>


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