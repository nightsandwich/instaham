import React from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

export default function Profile() {
    const posts = useSelector(state => state.posts)
    console.log('profile posts,' ,posts)
    let data = posts.map(post => post.downloadURL)
    // data = [...data, 'https://imgur.com/a/yT2LlLG']
    data = [...data, 'https://imgur.com/a/Q2kJguG']
    console.log(data)
    const ham = Array(posts.length - 1).fill('ham.png')
    return (
        <View style={styles.background}>
            <Text style={styles.headline_text}>Profile</Text>         
                <GridImageView data={data} />
                {/* <GridImageView data={ham} /> */}
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