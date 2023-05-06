/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import styled from 'styled-components';
import { Link} from 'react-router-dom';

function PostCardProfil({ post }) {
  return (
    <Post>
     <div className="postsList">
     <div className="cover">
        <Link to={'/posts/'+ post._id}>
          <img src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt='Image de couverture du post' />
        </Link>
      </div>
      

      
      <div className="abstract">
      <span>{post.title}</span>
        <p className='content'> {post.summary.substring(0,100) + "..."}
      
        </p>
      </div>
     </div>
    </Post>
  )
}

export default PostCardProfil

const Post = styled.div`
  /* align-items: center;
  justify-content: space-around;
  padding: 2rem ; */
  .postsList{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 7rem;
    margin-top: 1rem;
    

  }
  .cover{
    width: 10%;
  }
  .abstract{
    width: 60%;
    padding-left: 2rem;
    
  }
  img{
    max-width: 100%;
  }
  span{
    font-size: 1rem;
    font-weight: 600;
  }
  p{
    text-align: left;
    font-size: 0.8rem;
    color: #454242;
  }
  /* @media screen and (max-width: 1200px) {
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
    /* }
    h3{
      font-size: 2rem;
      padding: 1rem;
    }
    p{
      font-size: 1.4rem;
      padding: 1rem;
    }
  } */ 
  /* @media screen and (max-width: 1060px) {
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
    /* }
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
    /* }
    h3{
      font-size: 1rem;
      padding: 0.6rem;
    }
    p{
      font-size: 1rem;
      padding: 1rem;
    }
  } */ 
`
