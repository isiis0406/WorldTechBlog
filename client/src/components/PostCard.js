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
  @media screen and (max-width: 1200px) {
    padding: 4rem;
    .cover{
      width: 50%;
    }
    .abstract{
      width: 50%;
      padding: 1rem;
    }
    img{
      /* max-width: 140%; */
    }
    h3{
      font-size: 2rem;
      padding: 1rem;
    }
    p{
      font-size: 1.4rem;
      padding: 1rem;
    }
  }
  @media screen and (max-width: 1060px) {
    padding: 4rem;
    .cover{
      width: 50%;
    }
    .abstract{
      width: 50%;
      padding: 1rem;
    }
    img{
      /* max-width: 140%; */
    }
    h3{
      font-size: 1.8rem;
      padding: 1rem;
    }
    p{
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
  @media screen and (max-width: 970px) {
    flex-direction: column;
    padding: 0rem;
    .cover{
      width: 50%;
    }
    .abstract{
      width: 50%;
    }
    img{
      /* max-width: 140%; */
    }
    h3{
      font-size: 1rem;
      padding: 0.6rem;
    }
    p{
      font-size: 1rem;
      padding: 1rem;
    }
  }
`