import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../Global/Context';
import Header from './Header';
import { db } from '../config/config';
import { ImEarth } from 'react-icons/im';
import moment from 'moment';
import { withRouter } from 'react-router'
import { BiLike, BiComment } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import Modal from './Modal';
function PostDetail(props) {
    const { posts, idPost, user, loader, handleVote,addComments ,  openModal} = useContext(ContextProvider);
    const [postDetail, setPostDetail] = useState(null)
    const [comments, setComments] = useState("")
    const [showInputComments,setShowInputComments] = useState(true)
    const handleShowInputComments = () =>{
        setShowInputComments(!showInputComments)
    }
    const handleCommets = (id, content, username) => {
        if(user){
            if(content.length > 0){
                addComments(id, content, username)
                setComments("")    
            }else{
                alert("chưa nhập gì")
            }       
        }else{
            openModal()
            setComments("")
        }
        // if(comments.length > 0 ){
          
        // }
        // else{
        //     alert("bạn chưa nhập gì ");
        //     return;
        // }
    }
    // const handleDetail = () => {
    //     const itemDetail = posts.filter(item => {
    //         return item.id === idPost
    //     })
    //     setPostDetail(itemDetail)
    // }
    // useEffect(() => {
    //     handleDetail()
    // }, [])
    // console.log(postDetail);
    const postRef = db.collection("posts").doc(idPost)
    useEffect(() => {
        getPost()
    }, [handleVote])
    const getPost = () => {
        postRef.get().then(doc => {
            setPostDetail({ ...doc.data(), id: doc.id })
        })
    }
    // // console.log("posts",posts);
    // console.log("postDetail", postDetail);
    // console.log("user",user);
    const handleDeletePostDetail = (id) => {
        db.collection("posts").doc(id).delete()
        setPostDetail(null)
        props.history.push('/')
    }
    const renderPostDetail = () => {

        return postDetail &&
            <div className="container">
                {postDetail.image === undefined ?
                    <div className="detail-noImage col-lg-6">
                        <div className="detail-box">
                            <div className="postdetail__content-header">
                                <h3 className="avatar-user">{postDetail.postedBy.username[0].toUpperCase()}</h3>
                                <div className="box-username">
                                    <h5 className="username-user">{postDetail.postedBy.username}</h5>
                                    <small>{moment(postDetail.created_at).fromNow()}  <ImEarth /></small>
                                </div>
                            </div>
                            {!loader && user ? user.uid === postDetail.postedBy.id || user.email === "dduc1445@gmail.com" ? <button className="delete" onClick={() => handleDeletePostDetail(postDetail.id)}>Delete</button> : "" : ""}
                            <div className="postdetail__content-box">
                                <h3 className="hastag-post">{`# ${postDetail.hastag}`}</h3>
                                <h4 className="post-desc">{postDetail.content}</h4>
                                <div className="vote-detail">
                                    <div className="post-like">
                                        <BsHeart className={`icon-hear  `} size={20} ></BsHeart>
                                        <h4 className={`vote-count`}> {postDetail.vote_count} yêu thích</h4>
                                    </div>
                                    <div className="post-comment">
                                        <BiComment size={20}></BiComment>
                                        <h4 className="text-commemts">{postDetail.comments.length} bình luận</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="like like-detail">
                                <h4 onClick={() => handleVote(postDetail.id)} className={`btn-like `}><BiLike />Thích</h4>
                                <h4 onClick={handleShowInputComments} className={`btn-like `}><BiComment />Bình Luận</h4>
                                <h4 className={`btn-like `}><AiOutlineShareAlt />Chia sẻ</h4>
                            </div>
                            <div className="commets-list">
                                    {postDetail.comments && postDetail.comments.map((item, index) => {
                                        return (
                                            <div className="comments-item " key={index}>
                                                <div className="box-user ">

                                                    <div className="comments-user">
                                                        <p className="text-comenst">
                                                            {/* <p className="avatar-comments">{item.postBy.avatar}</p> */}
                                                            <a href="" className="user-comments">  {item.postBy.name}</a>
                                                            {item.contentComments}
                                                        </p>
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
                                    <button className="btn-comments" onClick={() => handleCommets(postDetail.id, comments, postDetail.username)}><FiSend></FiSend></button>
                                </div> : ""}
                        </div>
                    </div> :
                    <div className="col-12 postdetail">
                        <div className="postdetail__content row">
                            <div className="postdetail__content-left col-lg-7 col-md-12 col-sm-12">
                                <img src={postDetail.image}></img>
                            </div>
                            <div className="postdetail__content-right col-lg-5 col-md-12 col-sm-12">
                                <div className="postdetail__content-header">
                                    <h3 className="avatar-user">{postDetail.postedBy.username[0].toUpperCase()}</h3>
                                    <div className="box-username">
                                        <h5 className="username-user">{postDetail.postedBy.username}</h5>
                                        <small>{moment(postDetail.created_at).fromNow()}  <ImEarth /></small>
                                    </div>
                                </div>
                                {!loader && user ? user.uid === postDetail.postedBy.id || user.email === "dduc1445@gmail.com" ? <button className="delete" onClick={() => handleDeletePostDetail(postDetail.id)}>Delete</button> : "" : ""}
                                <div className="postdetail__content-box">
                                    <h3 className="hastag-post">{`# ${postDetail.hastag}`}</h3>
                                    <h4 className="post-desc">{postDetail.content}</h4>
                                    <div className="vote-detail">
                                        <div className="post-like">
                                            <BsHeart className={`icon-hear  `} size={20} ></BsHeart>
                                            <h4 className={`vote-count`}> {postDetail.vote_count} yêu thích</h4>
                                        </div>
                                        <div className="post-comment">
                                            <BiComment size={20}></BiComment>
                                            <h4 className="text-commemts">{postDetail.comments.length} bình luận</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="like like-detail">
                                    <h4 onClick={() => handleVote(postDetail.id)} className={`btn-like`}><BiLike />Thích</h4>
                                    <h4 onClick={handleShowInputComments} className={`btn-like `}><BiComment />Bình Luận</h4>
                                    <h4 className={`btn-like `}><AiOutlineShareAlt />Chia sẻ</h4>
                                </div>
                                <div className="commets-list">
                                    {postDetail.comments && postDetail.comments.map((item, index) => {
                                        return (
                                            <div className="comments-item " key={index}>
                                                <div className="box-user ">

                                                    <div className="comments-user">
                                                        <p className="text-comenst">
                                                            {/* <p className="avatar-comments">{item.postBy.avatar}</p> */}
                                                            <a href="" className="user-comments">  {item.postBy.name}</a>
                                                            {item.contentComments}
                                                        </p>
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
                                    <button className="btn-comments" onClick={() => handleCommets(postDetail.id, comments, postDetail.username)}><FiSend></FiSend></button>
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                }


            </div>
    }
    return (
        <>
         <Modal></Modal>
            <Header></Header>
            {renderPostDetail()}

        </>
    );
}

export default withRouter(PostDetail);