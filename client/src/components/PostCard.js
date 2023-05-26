import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <Post>
      <Cover>
        <Link to={'/posts/' + post._id}>
          <Image src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt='Image de couverture du post' />
        </Link>
      </Cover>
      <Abstract>
        <Title>{post.title}</Title>
        <Content>{post.summary.substring(0, 200) + "..."}</Content>
      </Abstract>
    </Post>
  )
}

export default PostCard;

const Post = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 10rem;

  @media screen and (max-width: 1200px) {
    padding: 4rem;

    h3 {
      font-size: 1.6rem;
      padding: 1rem;
    }

    p {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 970px) {
    padding: 2rem;

    h3 {
      font-size: 1.8rem;
      padding: 1rem;
    }

    p {
      font-size: 1.4rem;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 650px) {
    padding: 1rem;

    h3 {
      font-size: 1.2rem;
      padding: 0.5rem;
      text-align: center;
    }

    p {
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
`;

const Cover = styled.div`
  width: 40%;

  @media screen and (max-width: 970px) {
    width: 100%;
  }
`;

const Abstract = styled.div`
  width: 60%;
  padding: 1rem;

  @media screen and (max-width: 970px) {
    width: 100%;
  }
`;

const Image = styled.img`
  max-width: 100%;

  @media screen and (max-width: 970px) {
    /* max-width: 140%; */
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  padding-top: 2rem;
  margin: 1rem;
`;

const Content = styled.p`
  text-align: justify;
  font-size: 1.2rem;
  color: var(--main-text-color);
  line-height: 2rem;
`;
