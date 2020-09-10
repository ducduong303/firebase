import React, { useContext, useEffect, useState } from 'react'
import { ContextProvider } from '../Global/Context';
import { Link, withRouter } from 'react-router-dom';
import { auth, db, storage } from '../config/config';
// import firebase from "firebase"
// import { auth } from 'firebase';



 function Header(props) {
    const { openModal, user, loader,handleUserLogOut,hanldeSetLike,handleIdUser} = useContext(ContextProvider)

    // Hàm random backgroup
    // const [avata, setAvata] = useState("")
    // const ramDomavata = () => {
    //     const avartaImg = ["red","blue","black"];
    //     const index = Math.trunc(Math.random() * avartaImg.length);
    //     return avartaImg[index]
    
    // }
    // const Avatar = () =>{
    //     const avatarUser =  ramDomavata();
    //     setAvata(avatarUser);   
    // }

    const logOut = () => {
        auth.signOut().then(() => {
            // setUser(null)
            handleUserLogOut()
        })
            .catch((err) => {
                console.log(err);
            })
        // setLike(true)
        hanldeSetLike()
        props.history.push('/')
    }
    const openForm = () => {
        openModal();
    }
    const handleLogout = () => {
        logOut()
    }
    // useEffect(() =>{
    //     Avatar()

    // },[])

    
    const checkUser = () => {
        return !loader && user ?
            <>
                {user.displayName ? <p className="avatar" onClick={() =>handleIdUser(user.uid)}> <Link to={`/profile/${user.uid}`}>{user.displayName[0].toUpperCase()}</Link></p> : ""}
               
                <span onClick={() =>handleIdUser(user.uid)}><Link to={`/profile/${user.uid}`}>{user.displayName}</Link> </span> <span onClick={handleLogout}>/Logout</span>
            </>

            : (<span onClick={openForm}>Regisrer/Login</span>)
    }
    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/"><span>logo demo</span></Link>
                  
                </div>
                <div className="header__right">
                    {
                        checkUser()
                    }
                </div>
            </div>
        </div>
    )
}
export default withRouter(Header);