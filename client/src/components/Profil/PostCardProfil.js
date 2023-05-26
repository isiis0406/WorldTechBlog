import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function PostCardProfil({ post }) {
  return (
    <Post>
      <div className="postsList">
        <div className="cover">
          <Link to={'/posts/' + post._id}>
            <img src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt='couverture du post' />
          </Link>
        </div>
        <div className="abstract">
          <span>{post.title}</span>
        </div>
      </div>
    </Post>
  )
}

export default PostCardProfil

const Post = styled.div`
  .postsList {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 7rem;
    margin-top: 1rem;
  }
  
  .cover {
    width: 10%;
  }
  
  .abstract {
    width: 60%;
    padding-left: 2rem;
    font-weight: 100;
  }
  
  img {
    max-width: 100%;
  }
  
  span {
    font-size: 1rem;
    font-weight: 600;
  }
  
  p {
    text-align: left;
    font-size: 0.8rem;
    color: #454242;
  }

  @media screen and (max-width: 768px) {
    .postsList {
      flex-direction: column;
      align-items: flex-start;
      padding-left: 3rem;
      justify-content: center;
      width: 80%;
    }

    .cover {
      width: 100%;
      max-width: 300px;
      margin-bottom: 1rem;
    }

    .abstract {
      width: 100%;
      padding-left: 0;
    }

    .abstract span {
      font-size: 0.8rem;
      /* padding: 1rem; */
      text-align: center;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
