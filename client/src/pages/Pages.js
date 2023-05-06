import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import AddPost from './posts/AddPost';
import EditPost from './posts/EditPost';
import PostDetail from './posts/PostDetail';
import Login from './auth/Login';
import Register from './auth/Register';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import UserVerify from './auth/UserVerify';
import ResetPassword from './auth/ResetPassword';
import ForgotPassword from './auth/ForgotPassword';
import Profil from './Profil/Profil';



function Pages() {
  const { user } = useAuthContext();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Posts routes */}
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
          {/* Post detail Route */}
          <Route
            path='/posts/:id'
            element={<PostDetail />}>
          </Route>

        {/* Auth Routes */}
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />

          {/* Verify email */}
          <Route path='/auth/users/:id/verify/:token' element={<UserVerify />} />

          {/* forgot Password */}
          <Route path='/auth/reset-password' element={<ForgotPassword />} />
          {/*  Reset Password */}
          <Route path='/auth/users/:id/reset-password/:token' element={<ResetPassword />} />

        {/* Profile Routes */}
        <Route path='/users/:id/profil' element={<Profil/>}/>

      </Routes>

    </div>
  )
}

export default Pages