import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onLogin = this.onLogin.bind(this)
    }

    async onLogin(){
        const { email, password } = this.state;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
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
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="password"
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button 
                    onPress={() => this.onLogin()}
                    title="Log In"
                />
            </View>
        )
    }
}
