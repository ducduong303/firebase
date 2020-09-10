import React, { useState, useContext } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { ContextProvider } from '../Global/Context';
function CreatePost(props) {

    const { handleCreatePost, user , openModal } = useContext(ContextProvider);

    const [post, setPost] = useState({
        hastag: "",
        content: "",
    })
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    const handleFile = (e) => {
        console.log(e.target.files);
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setImage(image)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user) {
            openModal();
            setPost({
                hastag: "",
                content: "",
            })
            setImage(null)
            return;
        }
        handleCreatePost({ post, image })
        setPost({
            hastag: "",
            content: "",
        })
        setImage(null)

    }
    return (
        <div className="create-post">
            <div className="container">
                <div className="status-box col-lg-5">
                    <form onSubmit={handleSubmit}>
                        <div className="content-hastag ">
                            <input
                                className="status-content hastag"
                                placeholder="hastag của bạn?"
                                value={post.hastag}
                                name="hastag"
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="content">
                            <textarea
                                className="status-content"
                                placeholder="Bạn đang nghĩ gì ?"
                                value={post.content}
                                name="content"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="image-content">
                            <>
                                <label htmlFor="file"><AiFillCamera className="icon-camera" size={30} /></label>
                                <input type="file"
                                    className="file"
                                    id="file"
                                    onChange={handleFile}
                                    // required
                                />
                            </>
                            <div className="btn-create">
                                <input type="submit" className="btn-status" value="Create" ></input>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;