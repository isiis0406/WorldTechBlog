import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import AddPost from '../pages/AddPost';
import EditPost from '../pages/EditPost';
import Login from '../pages/Login';
import Register from '../pages/Register';


function Pages() {
  return (
    <div>
         <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/add-post' element={<AddPost/>}/>
            <Route path='/edit-post/:id' element={<EditPost/>}/>
            <Route path='/auth/register' element={<Register/>}/>
            <Route path='/auth/login' element={<Login/>}/>
        </Routes>

    </div>
  )
}

export default Pages