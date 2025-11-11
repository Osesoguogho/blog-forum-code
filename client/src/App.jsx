import React, { useState, useEffect } from 'react';
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
  Link,
  Navigate
} from "react-router-dom";
import Login, {Loader as LoginLoader, Action as LoginAction} from "./pages/Login";
import Register, {action as registerAction} from './pages/Register';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import BlogPosts, {Loader as BlogLoader} from './pages/BlogPosts';
import ComposePost from './pages/ComposePost';
import PostDetails, {Loader as PostLoader} from './pages/PostDetails';
import About from './pages/About';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute';
import UserPosts, {Loader as UserLoader } from './pages/UserPosts';
import EditPost from './pages/EditPost';
// import {RequireAuth} from './utils';



export default function App() {
  const token = localStorage.getItem("token")
 
    

  const router =     createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<BlogPosts />}
          errorElement={<Error/>}
          loader={BlogLoader}
        />
        <Route
          path='/:id'
          element={<PostDetails />}
          loader={PostLoader}
          // action={DetailAction}
          errorElement={<Error/>}
        />
        <Route element={<ProtectedRoute />}>
        <Route
          path='user_posts'
          element={<UserPosts />}
          loader={UserLoader}
          // action={DetailAction}
          errorElement={<Error/>}
        />
         <Route path="/new_post" 
          element={<ComposePost />} 
          // action={NewAction}
          />
          <Route path="/edit_post"
                  element={<EditPost/>}
                  // action={EditAction}
                  />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
       
          
          <Route
            path="/login"
            element={token? <Navigate to="/"/>:<Login />}
            loader={LoginLoader}
            action={LoginAction}
            errorElement={<Error/>}
          />
          <Route path="register" 
          element={token? <Navigate to="/"/> :<Register/>}
          // loader={registerLoader}
          action={registerAction}
          />
        </Route>
      
    )
  );
  

  return (
    <>
   <RouterProvider router={router} />
    
    </>
  )
}


