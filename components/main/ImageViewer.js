import React, { useState } from "react";
import { Image, FlatList } from "react-native";

export default function ImageViewer({data}) {
  const picsumImages = data;
  const hamURL = 'https://i.postimg.cc/wMH6hyZY/ham1.jpg' 
  const [opacity, setOpacity] = useState(0);

  const handleLike = () => {
    opacity < 1 ? setOpacity(opacity + .05) : handleHammed
  }
  const handleHammed = () => {
//TODO: create function to delete this photo from user's photos and add one more ham to instaham's posts
    return (
      <View>
        <Text>
          FULL HAM
        </Text>
      </View>
    )
  }
  const HamImage = () => {
    console.log(opacity)
    return (
      <TouchableOpacity onPress={handleLike}>  
        <Image
          source={ {uri: hamURL}}
          style={{position: 'absolute', height: 100, opacity: `${opacity}`}} 
        />
      </TouchableOpacity>
    )
  }
  function renderItem({ item }) {
    return (
      <View>
        <Image source={{ uri: item }} style={{ height: 100, position: 'absolute' }} />
        <HamImage/>
      </View>
    )
  }
  const [images, setImages] = useState(picsumImages);
  
  return (
    <FlatList data={images} renderItem={renderItem} />
  );
}