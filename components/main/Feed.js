import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect  } from 'react';
import { fetchAllPosts, fetchUser, editOpacityPost } from '../../redux/actions';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import ImageWithHam from './ImageWithHam';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostHeader from './PostHeader';

export default function Feed({navigation}) {
  const dimensions = Dimensions.get('window');
  const imageHeight = dimensions.width;
  const imageWidth = dimensions.width;

    const dispatch = useDispatch();
    const posts = useSelector(state => state.allPosts.sort((a,b) => a.created < b.created ? 1 : -1))
    
    // useEffect(() => {
    //     dispatch(fetchAllPosts())
    // }, [])
    // useEffect(() => {
    //     dispatch(fetchAllPosts())
    // }, [posts.length])
    // // console.log('all posts,' ,posts)
    
    // const Icon = createIconSetFromIcoMoon(
    //   icoMoonConfig,
    //   'LineAwesome',
    //   'line-awesome.ttf'
    // );
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
    const ham2 = {
      image: require('../../assets/ham copy.png')
    }
    const grill = {
      image: require('../../assets/grill.png')
    }
    if (posts.length === 0) return '...loading'

    return (
        <View style={styles.background}>
          <Text style={styles.headline_text}>Feed Instah<MaterialCommunityIcons name='food-drumstick-outline' size={25} color='pink'/>m
          </Text>
          <Text style={styles.explore_text}>
            Total Posts: {posts.length}
          </Text>          
          <ScrollView>
          {
                  posts.map((post, idx) => (
                    post.opacity > 0 && post.downloadURL !== hamURL ? 
                    <>
                      <View key={post.id + Math.random().toString(36)} style={{marginLeft: 12, marginBottom: 0, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: imageWidth/3}}>
                          <PostHeader avatar={post.avatar} name={post.name}/>
                      </View>
                    <TouchableOpacity
                      key={post.id} onPress={() => navigation.navigate('SinglePost', { post: post, renderWithHam: renderWithHam})}
                    >
                      {renderWithHam(post)}
                    </TouchableOpacity>
                    </>
                    : 
                    <Image
                      key={Math.random().toString(36)}
                      source={ham.image}
                      style={{width: imageWidth , height: imageHeight}}
                    />
                  ))
                }
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1
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