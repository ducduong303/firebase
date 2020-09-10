import React, { useContext, useState } from 'react';
import { ContextProvider } from '../Global/Context';
// import { ImEarth } from 'react-icons/im';
// import moment from 'moment';
import ContentPost from './ContentPost';
import { Route } from 'react-router-dom';

function Posts(props) {
    const { posts } = useContext(ContextProvider)
    const getPost = () => {
        // if (editing) {
            return (
                posts.map(post => {
                    return (
                        <ContentPost post={post} key={post.id}></ContentPost>
                        // <div className=" container" key={post.id}>
                        //     <div className=" posts-box col-lg-5">
                        //         <>
                        //             {/* Nếu tồn tại user mới  đúng user mới show nút và show bài đúng bài post của user đó  */}
                        //             {!loader && user ? user.uid === post.postIdUser ? <button className="delete" onClick={() => handlDelete(post.id)}>Delete</button> : "" : ""}
                        //             {!loader && user ? user.uid === post.postIdUser ? <button className="delete" onClick={(e)=> setOpen(true)}>Edit</button> : "" : ""}
                        //         </>
                        //         <div className="post-header">
                        //             <h3 className="avatar-user">{post.username[0].toUpperCase()}</h3>
                        //             <div className="box-username">
                        //                 <h5 className="username-user">{post.username}</h5>
                        //                 <small>{moment(post.created_at).fromNow()}  <ImEarth /></small>

                        //             </div>
                        //         </div>
                        //         <div className="post">
                        //             <div className="post-content">

                        //                 <h3 className="hastag-post">{post.hastag ? `#${post.hastag}` : ""} </h3>
                        //                 {/* Hàm viết hoa chữ cái đầu */}
                        //                 <p className="post-desc">{post.content.charAt(0).toUpperCase() + post.content.slice(1)}</p>
                        //             </div>
                        //             <div className="post-image">
                        //                 <img src={post.image} alt="" />
                        //             </div>
                        //         </div>    
                        //     </div>
                        // </div >
                    )
                })
            )
        // }
    }
    return (
        <>   
            {getPost()}
        </>

    );
}

export default Posts;