/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import styled from 'styled-components';

function PostCard({ post }) {
  return (
    <Post>
      <div className="cover">
        <img src={post.cover} alt='Image de couverture du post' />
      </div>
      <div className="abstract">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    </Post>
  )
}

export default PostCard

const Post = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 10rem;
  .cover{
    width: 40%;
  }
  .abstract{
    width: 60%;
    
  }
  img{
    max-width: 100%;
  }
  h3{
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  }
  p{
    padding: 2rem;
    text-align: justify;
    font-size: 1.2rem;
    color: #454242;
  }
`