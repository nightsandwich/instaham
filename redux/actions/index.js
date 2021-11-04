import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"; 

const auth = getAuth();
const db = getFirestore();

export function fetchUser(){
    return( async (dispatch) => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()){
            dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
        } else {
            console.log("Does not exist.")
        }
    })
}