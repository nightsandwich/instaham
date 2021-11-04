import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore';


export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, password, name } = this.state;
        const auth = getAuth();
        const db = getFirestore();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const userRef = doc(db, 'users', auth.currentUser.uid);
                setDoc(userRef, 
                    { name, email}
                    )
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            })
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput 
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="password"
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button 
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}
