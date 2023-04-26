import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import AddPost from '../pages/AddPost';
import EditPost from '../pages/EditPost';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useAuthContext } from '../hooks/useAuthContext';



function Pages() {
  const { user } = useAuthContext();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
       
       {/* Add Post route */}
        <Route
          path='/add-post'
          element={user ? <AddPost /> : <Navigate to="/auth/login" />}>
        </Route>
        {/* Edit post Route */}
        <Route
          path='/edit-post/:id'
          element={user ? <EditPost /> : <Navigate to="/auth/login" />}>
        </Route>
        <Route path='/edit-post/:id' element={<EditPost />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>

    </div>
  )
}

export default Pages