import React, {useState} from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDoc } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';

export default function Save(props) {
    const [caption, setCaption] = useState('')
    const image = props.route.params.image;
    const db = getFirestore();
    
    const uploadImage = async () => {
        let downloadURL;
        const auth = getAuth();
        const storage = getStorage();
        const storageRef = ref(storage, `post/${auth.currentUser.uid}/${Math.random().toString(36)}`);
        const metadata = {
            contentType: 'image/jpg'
        }
        const blob = await fetch(image).then(function(response){
            return response.blob();
        });
        try {
            const uploadTask = await uploadBytes(storageRef, blob, metadata);

            downloadURL = await getDownloadURL(storageRef)
            console.log('File available at', downloadURL);
        } catch (error) {
            console.log(error)
        }
        const savePostData = async () => {
            
            const postId = Math.random().toString(36)
            // const userCollectionRef = collection(db, "users")
            const userPostRef = doc(collection(db, 'posts'), auth.currentUser.uid, 'userPosts', postId)
            await setDoc(userPostRef, {
                downloadURL, caption, created: new Date(), opacity: 1
            })
            const postRef = doc(db, 'posts', postId);
            await setDoc(postRef, {
                 downloadURL, caption, created: new Date(), opacity: 1
            }) 
        }
        await savePostData();
        // auth.signOut();
        props.navigation.popToTop()

    }
    const changeText = (caption) => setCaption(caption)
    return (
        <View style={{flex: 1}}>
            <Image source={{image}}/>
            <TextInput
                placeholder='Write a Caption . . .'
                onChangeText={changeText}
            />
            <Button 
                title="Save"
                onPress={async() => await uploadImage()}
            />
        </View>
    )
}
