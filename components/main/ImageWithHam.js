import React, {useState} from 'react'
import { View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { editOpacityPost } from '../../redux/actions';

export default function ImageWithHam({image, postId, postOpacity, caption}) {
    const dispatch = useDispatch();
    const hamURL = 'https://i.postimg.cc/3NXbCx6s/pngaaa-com-4797789.png'
    
    const [opacity, setOpacity] = useState(1-postOpacity);
    const [opacityPhoto, setOpacityPhoto] = useState(postOpacity);
    
    // const post = useSelector(state => state.allPosts.find(statePost => statePost.id === post.id));

    // useEffect(()=> {

    //     setOpacityPhoto(postOpacity)
    // }, [])

    const handleLike = async() => {
      console.log(opacity)
      console.log(opacityPhoto)
    
        setOpacity(opacity + .05);
        setOpacityPhoto(opacityPhoto - .05);
        await dispatch(editOpacityPost(postId, opacityPhoto.toFixed(4)))
       if (opacityPhoto <= 0){
           
            //delete from user's posts
            //edit URL in all posts to be HAM
         //hamify()
       }
    }
    const HamImage = () => {
        return (
          <Image
                source={ {uri: hamURL}}
                style={{position: 'absolute', width: 300 , height: 300, opacity: opacity}}
              
            />
        )
    }

    return (
        <View
            style={{marginTop: 10}}
        >
            <Image
                source={ {uri: image}}
                style={{width: 300 , height: 300, opacity: opacityPhoto}} 
                
            />
            {
                image !== hamURL ? (
                    <View>
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
                ) : null
            }
            
            {
                !!caption ? 
                <Text style={{fontWeight: 'bold', color: 'black', backgroundColor: 'lightgrey', textAlign: 'center', width: 300}} >
                    User Caption: {caption}
                </Text> : null
            }
            
        </View>
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