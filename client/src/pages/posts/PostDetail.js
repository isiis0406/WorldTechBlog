/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useDeletePost } from '../../hooks/posts/useDeletePost';


function PostDetail() {
  const [post, setPost] = useState({});
  const param = useParams();
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuthContext();


  const { deletePost, error, isLoading } = useDeletePost();

  
  const handleDelete = (e) => {
    e.preventDefault()
    deletePost(post._id);
  }


  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    try {
      const json = await axios.get(`${process.env.REACT_APP_API_ROUTE}/posts/${param.id}`)
      setPost(json.data);
    } catch (error) {
      console.log(error.message)
    }

  }

  const authCheck = () => {
    if(user !== null){
      if(post.author === user.data.UserID){
        return true
      }
    }
    else{
      return false;
    };
  }
  return (
    <Post>
      <div className='header'>
        <h3>{post.title}</h3>
        <img src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt="couverture du post" />
        { authCheck() ? 
               <div className="icons">
               <Link to={"/edit-post/" + post._id}>
                 <FaEdit className='editIcone' />
               </Link>
               <form onSubmit={handleDelete} className="deleteIcon">
                 <button disabled={isLoading} className='btnDanger'><FaTrash /></button>
               </form>
               {error && <Error className='error'>{error}</Error>}
   
               {/* <p>{user.data._id}</p> */}
             </div>
             : <></>
        }
      </div>
      <p className='content-summary'> {post.summary}</p>
      <div className='content' dangerouslySetInnerHTML={{ __html: post.content }}>
        
      </div>
    </Post>
  )
}

export default PostDetail

const Post = styled.div`
  
  padding: 2rem 10rem;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }
  h3{
    padding: 2rem;
    font-size: 3rem;
  }
  img{
    max-width: 100%;
    width: 70%;
  }
  p{
    padding: 2rem ;
    text-align: justify;
  }
  .icons{
    padding: 1rem;
    font-size: 2rem;
    display: flex;
    justify-content: flex-end;

  }
  svg {
    color: #1D3557;
    cursor: pointer;
    
  }
  .deleteIcon svg{
    color: red;
    margin-left: 1rem;
  }
  .btnDanger{
    background-color: transparent;
    padding: 0;
    border: none;
    outline: none;
    font-size: 2rem;
  }
  .content-summary{
    line-height: 2rem;
    
  }
`

const Error = styled.p`
color: red;
font-weight: 500;
padding: 1rem;
text-align: center;
`