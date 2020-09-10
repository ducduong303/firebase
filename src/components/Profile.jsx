import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../Global/Context';
import { db } from '../config/config';
import Header from './Header';
import avatar from "../assets/image/no-img.png"
import { ImEarth } from 'react-icons/im';
import moment from 'moment';
import { BsHeart } from 'react-icons/bs';
import { BiComment, BiLike } from 'react-icons/bi';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';

function Profile(props) {
    const { idPost, user, idUser, posts, loader, handleDeletePost, handleVote, addComments, openModal } = useContext(ContextProvider);
    const [postUser, setPostUser] = useState(null);
    const [comments, setComments] = useState("")
    console.log("posts", posts);
    const [showInputComments, setShowInputComments] = useState(true)
    const handleShowInputComments = () => {
        setShowInputComments(!showInputComments)
    }
    const getPostUserProfile = () => {
        const Itempost = posts.filter(item => {
            return item.postIdUser === idUser
        })
        setPostUser(Itempost)
    }
    useEffect(() => {
        getPostUserProfile()
    }, [handleDeletePost])
    const handleCommets = (id, content, username) => {
        // nếu đã đăng nhập mới cho nó comments
        if (user) {
            if (content.length > 0) {
                addComments(id, content, username)
                setComments("")
            } else {
                alert("bạn chưa nhập gì ");
            }
        }
        else {
            openModal()
            return;
        }
    }
    console.log(postUser);

    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="profile-box col-12">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-3">
                                <img className="avatar-profile" src={avatar}></img>
                            </div>
                            <div className="col-lg-9">
                                <div className="username">
                                    <h2>{user.displayName}</h2>
                                    <h3>{user.email}</h3>
                                    <h4>Số Bài Post {postUser ? postUser.length : 0}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="profile-post">
                            {postUser && postUser.map((item, index) => {
                                return (
                                    <div className="profile-postItem" key={index}>
                                        {!loader && user ? user.uid === item.postIdUser || user.email === "dduc1445@gmail.com" ? <button className="delete" onClick={() => handleDeletePost(item.id)}>Delete</button> : "" : ""}
                                        {/* {!loader && user ? user.uid === item.postIdUser ? getClick() : "" : ""} */}
                                        <div className="post-header" >
                                            <h3 className="avatar-user">{item.username[0].toUpperCase()}</h3>
                                            <div className="box-username">
                                                <h5 className="username-user">{item.username}</h5>
                                                <small>{moment(item.created_at).fromNow()}  <ImEarth /></small>
                                            </div>
                                        </div>
                                        <div className="post-profile-content">
                                            <h3 className="hastag-post">{item.hastag ? `#${item.hastag}` : ""} </h3>
                                            <p className="post-desc">{item.content.charAt(0).toUpperCase() + item.content.slice(1)}</p>
                                        </div>
                                        <div className="post-image">
                                            <img src={item.image} alt="***" />
                                        </div>
                                        <div className="vote-coment">
                                            <div className="post-like">
                                                <BsHeart className={`icon-hear `} size={20} onClick={() => handleVote(item.id)}></BsHeart>
                                                <h4 className={`vote-count `}> {item.vote_count} yêu thích</h4>
                                            </div>
                                            <div className="post-comment">
                                                <BiComment size={20}></BiComment>
                                                <h4 className="text-commemts">{item.comments.length} bình luận</h4>
                                            </div>
                                        </div>
                                        <div className="like">
                                            <h4 onClick={() => handleVote(item.id)} className={`btn-like `}><BiLike />Thích</h4>
                                            <h4 className={`btn-like `}><BiComment />Bình Luận</h4>
                                            <h4 className={`btn-like `}><AiOutlineShareAlt />Chia sẻ</h4>
                                        </div>
                                        <div className="commets-list">
                                            {item.comments && item.comments.map((item, index) => {
                                                return (
                                                    <div className="comments-item " key={index}>
                                                        <div className="box-user ">
                                                            <div className="comments-user">
                                                                <p className="text-comments" >
                                                                    {/* <p className="avatar-comments">{item.postBy.avatar}</p> */}
                                                                    <a href="" className="avatar-comments">{item.postBy.avatar}</a>
                                                                    <Link to={`/`} className="user-comments">  {item.postBy.name}</Link>
                                                                    {item.contentComments}
                                                                </p>
                                                                <small>{moment(item.creat).fromNow()}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {showInputComments ? <div className="action-comment">
                                            <textarea
                                                className="input-commnets"
                                                placeholder="bình luận gì đó ?"
                                                value={comments}
                                                onChange={(e) => setComments(e.target.value)}
                                            >
                                            </textarea>
                                            <button className="btn-comments" onClick={() => handleCommets(item.id, comments, item.username)}><FiSend></FiSend></button>
                                        </div> : ""}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;