import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser(){
    return( async (dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()){
            dispatch({type: USER_STATE_CHANGE, user: snapshot.data()})
        } else {
            console.log("Does not exist.")
        }
    })
}