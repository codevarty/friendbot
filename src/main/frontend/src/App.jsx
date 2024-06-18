// eslint-disable-next-line no-unused-vars
import React from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Login from "./pages/account/Login.jsx";
import Signup from "./pages/account/Signup.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/api/user/login" element={<Login/>}/>
            <Route path="/api/user/signup" element={<Signup/>}/>
        </Routes>
    );
}

export default App
