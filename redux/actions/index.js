import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, getDocs, collection, setDoc } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";
import { FETCH_USER_POSTS } from "../constants";
import { FETCH_ALL_POSTS } from "../constants";
import { EDIT_OPACITY_POST, EDIT_CAPTION, FETCH_ALL_USERS } from "../constants";

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
export function fetchAllUsers(){
    return( async (dispatch) => {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, 'users'));
        let users = [];
        snapshot.forEach((doc) => {
            let userId = doc.id;
            let user = doc.data();
            user.id = userId;
            users.push(user)
        })
        dispatch({ type: FETCH_ALL_USERS, users })
    })
}
export function fetchAllPosts(){    
    return( async (dispatch) => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, `posts`));
        
// const snapshot = await getDocs(collection(db, 'users'));
// let users = [];
// snapshot.forEach((doc) => {
//     let userId = doc.id;
//     let user = doc.data();
//     user.id = userId;
//     users.push(user)
// })        
        let posts = [];
        querySnapshot.forEach(async(doc) => {
            let post = doc.data();
            let postId = doc.id;
    //find user info
    // const user = users.find(u => u.id === post.userId);
    // console.log('user', user)
    // console.log('docid', postId)
    
    // const docQuery= doc(db,'posts', postId);
    // await setDoc(docQuery, { avatar: user.avatar, username: user.name }, { merge: true })
    // post = await getDoc(docQuery);
    // post = post.data();
          //prep for store format  
            
            post.id = postId;
            posts.push(post)
        });
        // // posts.forEach(async(post) => {

        // // const docRef = doc(db, 'posts', post.id);
        // // await setDoc(docRef, { opacity: 1.0001 }, { merge: true });
        // // console.log('added opacity')
        // // })
        dispatch({ type: FETCH_ALL_POSTS, posts })

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
        const db = getFirestore();
        const docRef = doc(db, 'posts', postId)
        await setDoc(docRef, { opacity: +newOpacity }, { merge: true });
        let post = await getDoc(docRef);
    console.log('POST  ', post.data())
        post = post.data();
        post.id = postId;
        // const userDocRef = doc(collection(db, 'posts'), userId, 'userPosts', postId);
        // let userPost =await getDoc(userDocRef);
        // userPost = userPost.data();
        //     await setDoc(userDocRef, { opacity: +newOpacity }, { merge: true });
        //     userPost.id = postId;
        //     dispatch({ type: EDIT_OPACITY_POST_USER, userPost })
        dispatch({ type: EDIT_OPACITY_POST, post })
    })
}

export function editCaption(postId, newCaption){    
    return( async (dispatch) => {
        const db = getFirestore();
        const docRef = doc(db, 'posts', postId)
        await setDoc(docRef, { caption: newCaption }, { merge: true });
        let post = await getDoc(docRef);
    console.log('POST  ', post.data())
        post = post.data();
        post.id = postId;
        dispatch({ type: EDIT_CAPTION, post })
    })
}