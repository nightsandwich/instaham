import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect  } from 'react';
import { fetchAllPosts } from '../../redux/actions';
import { View, StyleSheet, Text } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

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
            <Text style={styles.headline_text}>Feed</Text>         
                <GridImageView data={data} />
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