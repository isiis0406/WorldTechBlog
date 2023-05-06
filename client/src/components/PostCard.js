/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <Post>
      <div className="cover">
        <Link to={'/posts/' + post._id}>
          <img src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt='Image de couverture du post' />
        </Link>
      </div>
      <div className="abstract">
        <h3>{post.title}</h3>
        <p className='content'>
        {post.summary.substring(0,280) + "..."}
        </p>
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
    padding-top: 2rem;
  }
  p {
    padding: 2rem;
    text-align: justify;
    font-size: 1.2rem;
    color: #454242;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
