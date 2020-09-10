import React, { createContext, useState, useEffect } from 'react';
import { auth, db, storage } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import firebase from "firebase"
export const ContextProvider = createContext();
const Context = (props) => {

    const [modal, setModal] = useState(false)
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [posts, setPosts] = useState([]);
    const [idPost, setIdPost] = useState(null);
    const [like, setLike] = useState(true)
    const [idUser,setIdUser] = useState(null)
    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
        // window.location.reload();
    }
    const hanldeSetLike = () => {
        setLike(true)
    }
    const handleIdUser = (id) =>{
        setIdUser(id)
        
    }
    const handleUserLogOut = () => {
        setUser(null)
    }
    const handleIdPost = (id) => {
        setIdPost(id)
    }
    const register = async (user) => {
        const { username, email, password } = user;
        console.log(user);

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            await res.user.updateProfile({ displayName: username });
            // setUser(res.user)
            closeModal()
            // setModal(false)
        } catch (err) {
            alert(err)
        }
    }
    const logIn = async (user) => {
        const { email, password } = user;
        try {
            const res = await auth.signInWithEmailAndPassword(email, password);
            // alert("Dang nhap thanh cong")
            closeModal();

        } catch (err) {
            console.log(err);
            alert('tafi khoan chua ton tai')
        }

    }
    // const logOut = () => {
    //     auth.signOut().then(() => {
    //         setUser(null)
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     setLike(true)
    //     props.history.push('/')
    // }
    const Checklike = () => {
        setLike(!like)
    }
    const handleVote = (id) => {
        if (user) {
            const post = db.collection("posts").doc(id);
            post.get().then(doc => {
                // exists là thuộc tính boolnull có sẵn
                const vote = doc.data().vote_count;
                if (like) {
                    post.update({ vote_count: vote + 1 })
                    Checklike()
                } else {
                    post.update({ vote_count: vote - 1 })
                    Checklike()
                }
            })
        } else {
            openModal();
        }
    }

    const handleCreatePost = (data) => {
        const { post, image } = data
        // nếu chưa nhập gì return
        if (image === null && post.content === "" && post.hastag === "") {
            alert("chưa nhập gì");
            return;
        }
        // Nếu không có ảnh thì up độc hastag vs contentthui
        if (image === null) {
            const newPost = {
                hastag: data.post.hastag,
                content: data.post.content,
                postedBy: {
                    id: user.uid,
                    username: user.displayName,
                },
                vote_count: 0,
                comments: [],
                created_at: Date.now()
            }
            return db.collection("posts").add(newPost)
        }

        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on("state_changed", (snap) => {
            let progress = (snap.bytesTransferred / snap.totalBytes) * 100
            console.log(progress);
        }, (err) => {
            console.log(err);

        },
            () => {
                //success dosomeing....
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // const { post, image } = data
                        const newPost = {
                            hastag: data.post.hastag,
                            content: data.post.content,
                            image: url,
                            nameImage: image.name,
                            postedBy: {
                                id: user.uid,
                                username: user.displayName,
                            },
                            vote_count: 0,
                            comments: [],
                            created_at: Date.now(), // giờ đăng endcode
                            // xem giờ trên database
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        db.collection("posts").add(newPost)
                    })
            })
    }
    const handleDeletePost = (id) => {
        if (user === null) {
            alert("đây không phải post của bạn ")
            return;
        }
        db.collection("posts").doc(id).delete()
    }

    const addComments = (id, contents) => {
        if (user) {   
            const post = db.collection("posts").doc(id);
            post.get().then(doc => {
                if (doc.exists) {
                    const prevcomments = doc.data().comments || [];
                    const comments = {
                        postBy:{
                            avatar:user.displayName[0].toUpperCase(),
                            id:user.uid,
                            name:user.displayName, // tên đăng nhập
                        }, 
                        idComments:uuidv4(),
                        contentComments: contents,
                        creat:Date.now()
                    }
                    const commentsUpdate = [...prevcomments, comments];
                    post.update({ comments: commentsUpdate });
                }
            })
        }
        else{
            openModal();
        }
    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            setLoader(false)
        })
        //  db.collection("posts")  .onSnapshot là kéo về

        //Nhận posts map
        db.collection("posts")
            .orderBy("created_at", "desc")
            .onSnapshot((snap) => {
                console.log(snap.docs);
                setPosts(snap.docs.map(doc => {
                    return {
                        id: doc.id,
                        postIdUser: doc.data().postedBy.id,
                        username: doc.data().postedBy.username,
                        content: doc.data().content,
                        hastag: doc.data().hastag,
                        image: doc.data().image,
                        comments: doc.data().comments,
                        vote_count: doc.data().vote_count,
                        created_at: doc.data().created_at,
                        nameImage: doc.data().nameImage,
                    }
                }))
            })
    }, []);
    return (
        <ContextProvider.Provider value={
            {
                modal: modal,
                openModal: openModal,
                closeModal: closeModal,
                register: register,
                logIn: logIn,
                user: user,
                loader: loader,
                // logOut: logOut,
                handleCreatePost: handleCreatePost,
                posts: posts,
                handleDeletePost: handleDeletePost,
                handleIdPost: handleIdPost,
                idPost: idPost,
                idUser:idUser,
                handleVote: handleVote,
                handleUserLogOut: handleUserLogOut,
                hanldeSetLike: hanldeSetLike,
                addComments: addComments,
                handleIdUser:handleIdUser
            }
        }
        >
            {props.children}
        </ContextProvider.Provider>
    )
}

export default Context
