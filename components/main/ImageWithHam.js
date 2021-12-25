import React, {useState} from 'react'
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Avatar, FAB, Divider } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { editOpacityPost, fetchAllUsers, fetchAllPosts } from '../../redux/actions';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { useLayoutEffect } from 'react';
export default function ImageWithHam({post, handleLike }) {
    const dispatch = useDispatch();
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width;
    const imageWidth = dimensions.width;
    
    // const [opacity, setOpacity] = useState(1-post.opacity);
    // const [opacityPhoto, setOpacityPhoto] = useState(post.opacity);
   
    // const handleLike = async() => {
    //     console.log(opacityPhoto)
    //     console.log(opacity)
    //     setOpacity((prevOpacity) => prevOpacity + .05);
    //     setOpacityPhoto(prevOpacityPhoto => prevOpacityPhoto - .05);
    //     dispatch(editOpacityPost(post.id, (opacityPhoto - .05).toFixed(4)))
    //   }
      
    //   useEffect(() => {
    //       return () => {
    //           console.log('unmounting: opacityphoto: ', opacityPhoto)
    //       };
    //   }, [])
  
    const ham = {
        image: require('../../assets/ham.png')
    }
    const HamImage = () => {
        return (
          <Image
                source={ham.image}
                style={{position: 'absolute', width: imageWidth , height: imageHeight}}
            />
        )
    }
    if (!post.id) return '...loading'
    return (
        <>
        <View
            style={{marginTop: 5, marginLeft: 10, marginBottom: 10 }}
        >
            <HamImage/>
            <Image
                source={ {uri: post.downloadURL}}
                style={{width: imageWidth , height: imageHeight, opacity: post.opacity, }}      
            />
            {/* <Text style={{color: 'white'}}>
                {opacityPhoto}
            </Text>
            <Text style={{color: 'white'}}>
                {post.id}
            </Text> */}
            <FAB 
                placement='left' 
                color='black'
                style={{marginBottom: 30}}
                icon={
                <Icon name="heart" type='font-awesome'
                    onPress={() => handleLike(post)}
                    color='red'
                />
                }
            />
        </View>
        {/* <Divider orientation='horizontal' color='darkslategrey' /> */}
        </>
    )
}
const styles = (opacity, opacityPhoto) => StyleSheet.create({
    ham: {
        opacity: opacity
    },
    img: {
        opacity: opacityPhoto
    }
})