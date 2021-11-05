import React from 'react'
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

export default function Feed() {
    const posts = useSelector(state => state.allPosts)
    console.log('all posts,' ,posts)
    const data = posts.map(post => post.downloadURL)
    return (
        <View>
            <Text>Feed</Text>         
            <GridImageView data={data} />
        </View>
    )
}
