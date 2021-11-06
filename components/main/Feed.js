import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect  } from 'react';
import { fetchAllPosts } from '../../redux/actions';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import ImageWithHam from './ImageWithHam';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';


export default function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.allPosts.sort((a,b) => a.created < b.created ? 1 : -1))
    
    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])
    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [posts.length])
    console.log('all posts,' ,posts)
    
    const Icon = createIconSetFromIcoMoon(
      icoMoonConfig,
      'LineAwesome',
      'line-awesome.ttf'
    );
    
    return (
        <View style={styles.background}>
          <Text style={styles.headline_text}>Feed InstaHam
            <Icon /> 
          </Text>
          <Text style={styles.explore_text}>
            Total Posts: {posts.length}
          </Text>          
          <ScrollView>
            {
              posts.map(post => (
                <ImageWithHam key={post.id} image={post.downloadURL} postId={post.id} postOpacity={post.opacity}/>
              ))
            }
            {/* <ImageWithHam image={image}/>
            <ImageWithHam image={image}/> */}
            {/* <GridImageView data={data} /> */}
            
          </ScrollView>
        </View>
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