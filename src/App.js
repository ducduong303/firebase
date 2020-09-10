import React, { useContext, useState } from 'react';
import './App.css';

import Context, { ContextProvider } from './Global/Context';
import PostDetail from './components/PostDetail';
import Comments from './components/Comments';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
function App() {

    const { idPost,user,idUser} = useContext(ContextProvider);  
 
 
    return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path={`/post/${idPost}`}>
                        <PostDetail></PostDetail>
                    </Route>
                    <Route path={`/profile/${idUser}`}>
                        <Profile></Profile>
                    </Route>
                </Switch>
            </Router>
        // <Context>

        //    
        //      
        //      
        //         


        // </Context>

    );
}

export default App;
