import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import axios from 'axios';


function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    try {
      const datas = await axios.get(`${process.env.REACT_APP_API_ROUTE}/posts`);
      setPosts(datas.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <List>
      {posts.map(post => {
        return (
          <PostCard key={post._id} post={post} />
        )
      })}
    </List>
  )
}

export default PostsList

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`