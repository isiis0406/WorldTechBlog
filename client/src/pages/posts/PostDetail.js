/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useDeletePost } from '../../hooks/posts/useDeletePost';
import { format } from 'date-fns';

function PostDetail() {
  const [post, setPost] = useState({});
  const param = useParams();
  const { user } = useAuthContext();
  const { deletePost, error, isLoading } = useDeletePost();

  const handleDelete = (e) => {
    e.preventDefault();
    deletePost(post._id);
  };

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const json = await axios.get(`${process.env.REACT_APP_API_ROUTE}/posts/${param.id}`);
      setPost(json.data);
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const authCheck = () => {
    if (user !== null) {
      if (post.author._id === user.data.UserID) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <Post>
      <Header>
        <Title>{post.title}</Title>
        <CoverImage src={`${process.env.REACT_APP_API_ROUTE}/` + post.cover} alt="couverture du post" />
        {post.author && (
          <Infos>
            <AuthorName>{post.author.name}</AuthorName>
            <CreatedAt>Publié le {format(new Date(post.createdAt), "dd-MM-yyyy")}</CreatedAt>
          </Infos>
        )}
        {post.author && authCheck() && (
          <Icons>
            <Link to={"/edit-post/" + post._id}>
              <FaEdit className='editIcone' />
            </Link>
            <form onSubmit={handleDelete} className="deleteIcon">
              <button disabled={isLoading} className='btnDanger'><FaTrash /></button>
            </form>
            {error && <Error className='error'>{error}</Error>}
          </Icons>
        )}
      </Header>
      <Summary>{post.summary}</Summary>
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </Post>
  );
}

export default PostDetail;

const Post = styled.div`
  padding: 2rem 10rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 2rem;
  font-size: 3rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;

const CoverImage = styled.img`
  max-width: 100%;
  width: 70%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Infos = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorName = styled.span`
  font-size: 1rem;
  padding: 1rem;
  color: #1D3557;
  text
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

const CreatedAt = styled.span`
  font-size: 1rem;
  padding: 1rem;
  color: #1D3557;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

const Icons = styled.div`
  padding: 1rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-end;

  svg {
    color: #000;
    cursor: pointer;
  }

  .deleteIcon svg {
    color: red;
    margin-left: 1rem;
  }

  .btnDanger {
    background-color: transparent;
    padding: 0;
    border: none;
    outline: none;
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.5rem;

    .btnDanger {
      font-size: 1.5rem;
    }
  }
`;

const Summary = styled.p`
  padding: 2rem;
  text-align: justify;
  line-height: 2rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const Content = styled.div`
  padding: 2rem;
  text-align: justify;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const Error = styled.p`
  color: red;
  font-weight: 500;
  padding: 1rem;
  text-align: center;
`;
