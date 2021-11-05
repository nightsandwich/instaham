import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, getDocs, collection } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";
import { FETCH_USER_POSTS } from "../constants";

export function fetchUser(){
    return( async (dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()){
            let user = snapshot.data();
            user.id = auth.currentUser.uid;
            dispatch({type: USER_STATE_CHANGE, user})
        } else {
            console.log("Does not exist.")
        }
    })
}

export function fetchUserPosts(){    
    return( async (dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const userId = auth.currentUser.uid;
        const querySnapshot = await getDocs(collection(db, `posts/${userId}/userPosts`));
        let posts = [];
        querySnapshot.forEach((doc) => {
            if(doc.id){
                let postId = doc.id;
                let post = doc.data();
                post.id = postId;
                posts.push(post)
            }    
        });
console.log('fetchuserposts     ', posts)
        dispatch({ type: FETCH_USER_POSTS, posts})

        // const docRef = doc(db, 'users', auth.currentUser.uid);
        // const snapshot = await getDoc(docRef);
        // if (snapshot.exists()){
        //     dispatch({type: USER_STATE_CHANGE, user: snapshot.data()})
        // } else {
        //     console.log("Does not exist.")
        // }
    })
}