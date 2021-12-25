import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect  } from 'react';
import { fetchAllPosts } from '../../redux/actions';
import { View, Image, StyleSheet, Text, ScrollView, Dimensions, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { FAB, Avatar } from 'react-native-elements';
import ImageWithHam from './ImageWithHam';
import { editOpacityPost } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import { editCaption } from '../../redux/actions';

export default function SinglePost({navigation, route}) {
    const post = route.params.post;
    const dispatch = useDispatch();
    // const [post, user] = useSelector(state => [state.allPosts.find(p => p.id === route.params.post.id), state.user]);
    // const [post, user] = useSelector(state => [state.allPosts.find(post => post.id === route.params.post.id), state.user]);
    const user = useSelector(state => state.user);
    // console.log('storepost', storePost)
    console.log('post', post)
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width;
    const imageWidth = dimensions.width;
    
    // const [opacity, setOpacity] = useState(1-post.opacity);
    // const [opacityPhoto, setOpacityPhoto] = useState(post.opacity);
    // useEffect(()=> {
        
    // }, [opacityPhoto])
    // const handleLike = async() => {
    //   console.log(opacity)
    //   console.log(opacityPhoto)
    
    //     await setOpacity(opacity + .05);
    //     await setOpacityPhoto(opacityPhoto - .05);
    //     await dispatch(editOpacityPost(post.id, (opacityPhoto - .05).toFixed(4)))
    //    if (opacityPhoto <= 0){
           
    //         //delete from user's posts
    //         //edit URL in all posts to be HAM
    //      //hamify()
    //    }
    // }
    
    // const hamURL = 'https://i.postimg.cc/3NXbCx6s/pngaaa-com-4797789.png'
    
    const [text, setText] = useState(post.caption)
    const onChangeText = (text) => {
        setText(text)
    }
    const handleSubmit = () => {
        dispatch(editCaption(post.id, text));
        navigation.goBack();
    }
    return (
        <View style={styles.background}>
            <MaterialCommunityIcons name="arrow-left-bold" color='red' size={60} onPress={()=>{
                navigation.goBack()
                dispatch(fetchAllPosts());
                }} style={{marginTop: 10}}/>
            <View style={{marginLeft: 12, marginBottom: 0, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: imageWidth/7.5}}>
                <Avatar
                    source={{ uri: post.avatar }}
                    rounded
                    size='medium'
                />
                <Text style={{fontWeight: 'bold', fontSize: 16, textDecoration: 'underline', color: 'white', alignContent: 'flex-end', marginLeft: 10}}>
                    {post.username}
                </Text>
            </View>

            
            {route.params.renderWithHam(post)}
            {/* <ImageWithHam postId={post.id}/> */}
            <View style={{marginLeft: 15, marginTop: 5}}>
            {
                user.id !== post.userId && (
                    <Text style={{color: 'white'}}>
                        {post.caption && `Caption:  ${post.caption}`} 
                    </Text>
                )
            }
            {
                user.id === post.userId && (
                    <View>
                        <TextInput
                        value={text}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={onChangeText}
                        placeholder='Add Caption'
                        placeholderTextColor='white'
                        style={{color: 'white'}}
                        />
                        <Button onPress={() => handleSubmit()} color='purple' title='Edit' style={{borderRadius: 10, width: imageWidth/2}} />
                    </View>
                )
            }
                <Text style={{color: 'white'}}>
                    Posted On: INSERT DATE
                </Text>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    background: {
      backgroundColor: 'black',
      flex: 1,
    },
    image: {
      width: 600,
      height: 600
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
// const styles = ({imageHeight, imageWidth, opacity, opacityPhoto}) => StyleSheet.create({
//     background: {
//       backgroundColor: 'black'
//     },
//     image: {
//       width: imageWidth,
//       height: imageHeight,
//       opacity: opacityPhoto
//     },
//     ham: {
//         width: imageWidth,
//         height: imageHeight,
//         position: 'absolute',
//         opacity: opacity,
//     },
//     headline_text: {
//       color: 'white',
//       fontSize: 30,
//       fontWeight: 'bold',
//       marginTop: 50,
//       marginLeft: 20
//     },
//     explore_text: {
//       marginTop: 5,
//       marginBottom: 10,
//       color: 'white',
//       marginLeft: 20,
//       fontSize: 12,
//       fontWeight: '600'
//     },
//   });