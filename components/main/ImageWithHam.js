import React, {useState} from 'react'
import { View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export default function ImageWithHam({image}) {
    const hamURL = 'https://i.postimg.cc/3NXbCx6s/pngaaa-com-4797789.png'
    
    const [opacity, setOpacity] = useState(0);
    const [opacityPhoto, setOpacityPhoto] = useState(1);
    
    const handleLike = () => {
      console.log(opacity)
      console.log(opacityPhoto)
      setOpacity(opacity + .05);
      setOpacityPhoto(opacityPhoto - .05);
    //   if (opacityPhoto <= 0){
//TODO: add opacityPhoto to database    
    //     //hamify()
    //   }
    }
    const HamImage = () => {
        return (
          <Image
                source={ {uri: hamURL}}
                style={{position: 'absolute', width: 300 , height: 300, opacity: `${opacity}`}} 
            />
        )
    }

    return (
        <View
            style={{marginTop: 1}}
        >
            <Image
                source={ {uri: image}}
                style={{width: 300 , height: 300, opacity: `${opacityPhoto}`}} 
            />
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
    )
}
