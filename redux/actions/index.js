import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, getDocs, collection, setDoc } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";
import { FETCH_USER_POSTS } from "../constants";
import { FETCH_ALL_POSTS } from "../constants";
import { EDIT_OPACITY_POST } from "../constants";
import { EDIT_OPACITY_POST_USER } from "../constants";

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
export function fetchAllPosts(){    
    return( async (dispatch) => {
        const db = getFirestore();
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const querySnapshot = await getDocs(collection(db, `posts`));
        let posts = [];
        querySnapshot.forEach((doc) => {
            let postId = doc.id;
            let post = doc.data();
            post.id = postId;
            posts.push(post)
        });
        // posts.forEach(async(post) => {

        // const docRef = doc(db, 'posts', post.id);
        // await setDoc(docRef, { userId: userId }, { merge: true });
        // console.log('added opacity')
        // })
        dispatch({ type: FETCH_ALL_POSTS, posts})

        // const docRef = doc(db, 'users', auth.currentUser.uid);
        // const snapshot = await getDoc(docRef);
        // if (snapshot.exists()){
        //     dispatch({type: USER_STATE_CHANGE, user: snapshot.data()})
        // } else {
        //     console.log("Does not exist.")
        // }
    })
}

export function fetchUserPosts(){    
    return( async (dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const userId = auth.currentUser.uid;
        const querySnapshot = await getDocs(collection(db, `posts/${userId}/userPosts`));
        let posts = [];
        querySnapshot.forEach(async(doc) => {
            if(doc.id){
                let postId = doc.id;
                let post = doc.data();
                post.id = postId;
                posts.push(post)
            }    
        });
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

export function editOpacityPost(postId, newOpacity){    
    return( async (dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const userId = auth.currentUser.uid;
        const docRef = doc(db, 'posts', postId)
        await setDoc(docRef, { opacity: +newOpacity }, { merge: true });
        let post = await getDoc(docRef);
    console.log('POST  ', post)
        post = post.data();
        post.id = postId;
        const userDocRef = doc(collection(db, 'posts'), userId, 'userPosts', postId);
        const query = await getDoc(userDocRef);
        if(query.data().id){
            await setDoc(userDocRef, { opacity: +newOpacity }, { merge: true });
            let userPost =await getDoc(userDocRef);
            userPost = userPost.data();
            userPost.id = postId;
            dispatch({ type: EDIT_OPACITY_POST_USER, userPost })
        }
        dispatch({ type: EDIT_OPACITY_POST, post })
    })
}