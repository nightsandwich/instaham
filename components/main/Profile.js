import React from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

export default function Profile() {
    const posts = useSelector(state => state.posts)
    console.log('profile posts,' ,posts)
    const data = posts.map(post => post.downloadURL)
    return (
        <View>
            <Text>Profile</Text>         
            <GridImageView data={data} />
        </View>
    )
}
