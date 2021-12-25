import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function PostHeader({avatar, name}) {
    return (
        <>
        <Avatar
            source={{ uri: avatar }}
            rounded
            size='medium'
        />
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white', alignContent: 'flex-end'}}>
            {name}
        </Text>
        <MaterialCommunityIcons name='silverware-fork-knife' color='white' size={25}/>
        </>
    )
}
