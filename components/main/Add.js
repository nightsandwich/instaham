import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Camera.requestCameraPermissionsAsync().then(cameraStatus).then(setCameraPermission(cameraStatus));
    // ImagePicker.requestMediaLibraryPermissionsAsync().then(galleryStatus).then(setGalleryPermission(galleryStatus));
    async function status (){
          const cameraStatus = await Camera.requestCameraPermissionsAsync().then(cameraStatus).then(setCameraPermission(cameraStatus));
          setCameraPermission(cameraStatus.status === 'granted');  

          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setGalleryPermission(galleryStatus.status === 'granted');
    };
    status();
  }, []);

  const takePicture = async() => {
    if(camera){
      try {
        const data = await camera.takePictureAsync(null);
        console.log('data, ', data)
        await setImage(data.uri);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('result of pick image', result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (cameraPermission === null || galleryPermission === false) {
    return <View />;
  }
  if (cameraPermission === false || galleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1}}>
        <View style={ styles.cameraContainer }>
        <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type} 
            ratio="1:1"
        />
        </View>
        <Button
            style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center' 
            }}
            title='Flip Image'
            onPress={() => {
            setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
            }}>
        </Button>
        <Button title="Take Photo" onPress={() => takePicture()} />
        <Button title="Pick Photo" onPress={() =>  pickImage()} />
        <Button title="Save" onPress={() =>  navigation.navigate('Save', {image})} />
        {
            image && <Image source={{uri: image}} style={ styles.image } /> 
        }
    </View>
  );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    image: {
        flex: 1
    }
    
})