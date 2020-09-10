import React from 'react';
import Header from './Header';
import Modal from './Modal';
import CreatePost from './CreatePost';
import Posts from './Posts';

function Home(props) {
    return (
        <div>
            <Header></Header>
            <Modal></Modal>
            <CreatePost></CreatePost>
            <Posts></Posts>
        </div>
    );
}

export default Home;