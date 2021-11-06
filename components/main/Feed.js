import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect  } from 'react';
import { fetchAllPosts } from '../../redux/actions';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import GridImageView from 'react-native-grid-image-viewer';
import ImageWithHam from './ImageWithHam';

export default function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.allPosts)
    
    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [posts.length])
    console.log('all posts,' ,posts)
    
    const data = posts.map(post => post.downloadURL)
    
    return (
        <View style={styles.background}>
          <Text style={styles.headline_text}>Feed InstaHam 
          </Text>
          <Text style={styles.explore_text}>
            Total Posts: {posts.length}
          </Text>          
          <ScrollView>
            {
              posts.map(post => (
                <ImageWithHam key={post.id} image={post.downloadURL}  />
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