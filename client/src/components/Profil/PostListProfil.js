import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCardProfil from '../Profil/PostCardProfil';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function PostsListProfil() {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPosts = async () => {
    try {
      const datas = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/${params.id}/posts`);
      setPosts(datas.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <List>
      {posts.map(post => {
        return (
          <PostCardProfil key={post._id} post={post} />
        )
      })}
    </List>
  )
}

export default PostsListProfil

const List = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 1rem; */
`