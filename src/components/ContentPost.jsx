import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../Global/Context';

import { ImEarth } from 'react-icons/im';
import { BsHeart } from 'react-icons/bs';
import { BiLike, BiComment } from 'react-icons/bi';
import moment from 'moment';
import { db } from '../config/config';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { storage } from 'firebase';
import { Link } from 'react-router-dom';

function ContentPost(props) {
    const { post } = props;
    const { handleDeletePost, user, loader, addComments, handleIdPost,    handleIdUser, handleVote, openModal } = useContext(ContextProvider);
    const [hastagEdit, setHastagEdit] = useState(post.hastag);
    const [contentEdit, setContentEdit] = useState(post.content);
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState("")

    const [showInputComments, setShowInputComments] = useState(false)
    const handleShowInputComments = () => {
        setShowInputComments(!showInputComments)
    }
    const handlDelete = (id) => {
        handleDeletePost(id)
    }
    const handleShare = () => {
        alert("Xin lỗi vì tính năng này chưa hoàn thiện ")
    }
    const getClick = () => {
        return open ? <button className="delete" onClick={() => handleEidt()}>Save</button> : <button className="delete" onClick={(e) => setOpen(true)}>Edit</button>
    }
    const handleEidt = () => {
        db.collection("posts").doc(post.id).set({
            hastag: hastagEdit,
            content: contentEdit,
        }, { merge: true })
        setOpen(false)
    }
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

    return (
        <div className=" container" key={post.id}>
            <div className=" posts-box col-lg-5">
                <>
                    {/* Nếu tồn tại user mới  đúng user mới show nút và show bài đúng bài post của user đó  */}
                    {!loader && user ? user.uid === post.postIdUser || user.email === "dduc1445@gmail.com" ? <button className="delete" onClick={() => handlDelete(post.id)}>Delete</button> : "" : ""}
                    {!loader && user ? user.uid === post.postIdUser ? getClick() : "" : ""}
                </>
                <div className="post-header">
                    <h3 className="avatar-user">{post.username[0].toUpperCase()}</h3>
                    <div className="box-username">
                        <h5 className="username-user">{post.username}</h5>
                        <small>{moment(post.created_at).fromNow()}  <ImEarth /></small>
                    </div>
                </div>

                <div className="post">
                    <div className="post-content">
                        {open ?
                            <form onSubmit={handleEidt}>
                                <textarea
                                    rows="2"
                                    className="hastag-editing"
                                    type="text"
                                    onChange={(e) => setHastagEdit(e.target.value)}
                                    value={hastagEdit}
                                    onKeyUp={(event) => event.key === "Enter" ? handleEidt() : ""}
                                ></textarea>
                            </form>
                            :
                            <Link to={`/post/${post.id}`} onClick={() => handleIdPost(post.id)} >
                                <h3 className="hastag-post">{post.hastag ? `#${post.hastag}` : ""} </h3>
                            </Link>

                        }
                        {
                            open ?
                                <form onSubmit={handleEidt} className="form-editing">
                                    <textarea
                                        rows="10"
                                        className="content-editing"
                                        onChange={(e) => setContentEdit(e.target.value)}
                                        value={contentEdit}
                                    // onKeyUp={(event) => event.key === "Enter" ? handleEidt() : ""}
                                    ></textarea>
                                </form>
                                :
                                // hàm viết hoa chữ cái đầu
                                <p className="post-desc">{post.content.charAt(0).toUpperCase() + post.content.slice(1)}</p>

                        }
                    </div>
                    <div className="post-image">
                        <Link to={`/post/${post.id}`} onClick={() => handleIdPost(post.id)} >
                            <img src={post.image} alt="**" />
                        </Link>
                    </div>
                    <div className="vote-coment">
                        <div className="post-like">
                            <BsHeart className={`icon-hear `} size={20} onClick={() => handleVote(post.id)}></BsHeart>
                            <h4 className={`vote-count `}> {post.vote_count} yêu thích</h4>
                        </div>
                        <div className="post-comment">
                            <BiComment size={20}></BiComment>
                            <h4 className="text-commemts">{post.comments.length} bình luận</h4>
                        </div>
                    </div>
                    <div className="like">
                        <h4 onClick={() => handleVote(post.id)} className={`btn-like `}><BiLike />Thích</h4>
                        <h4 onClick={handleShowInputComments} className={`btn-like `}><BiComment />Bình Luận</h4>
                        <h4 onClick={handleShare} className={`btn-like `}><AiOutlineShareAlt />Chia sẻ</h4>

                    </div>
                    <div className="commets-list">
                        {post.comments && post.comments.map((item, index) => {
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
                        <button className="btn-comments" onClick={() => handleCommets(post.id, comments, post.username)}><FiSend></FiSend></button>
                    </div> : ""}

                </div>
            </div>
        </div >
    );
}

export default ContentPost;