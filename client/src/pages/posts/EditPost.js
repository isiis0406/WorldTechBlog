/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import JoditEditor from 'jodit-react';
// import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import Button from '../../components/Button';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEditPost } from '../../hooks/posts/useEditPost';
import { useParams, useNavigate } from 'react-router-dom';


function EditPost() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [oldCoverName, setOldCoverName] = useState('');
  const [file, setFile] = useState(null);

  const { EditPost, isLoading, error } = useEditPost();
  const param = useParams();
  const navigate = useNavigate();

  //RichText Editor
  const editor = useRef(null);

  const { user } = useAuthContext();


  useEffect(() => {
    setAuthorId(user.data.UserID);
    getPost();
  }, [])

  //Get the post
  const getPost = async () => {
    try {
      const json = await axios.get(`${process.env.REACT_APP_API_ROUTE}/posts/${param.id}`)

      setTitle(json.data.title);
      setCategory(json.data.category);
      setSummary(json.data.summary);
      setContent(json.data.content);
      setOldCoverName(json.data.cover);
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newpost = { title, category, authorId, summary, content, oldCoverName };
    if (file) {
      const data = new FormData();
      const filename = Date.now().toString() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newpost.cover = filename;

      try {
        const uploadURI = `${process.env.REACT_APP_API_ROUTE}/upload`;

        await axios.post(uploadURI, data, {
          headers: {
            Authorization: `Bearer ${user.data.token}`
          }
        });

      } catch (error) {
        console.log(error.message);
      }
    }
    await EditPost(param.id, newpost);
     //Redirect to home Page
     navigate(`/posts/${param.id}`);
  }
  return (
    <Wrapper>
      <h2>Édition</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Titre...'
          className='title'
          name='title'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />

        <textarea
          name="summary"
          id="summary"
          cols="30"
          rows="10"
          placeholder='Resumé'
          className="summary"
          value={summary}
          onChange={(e) => { setSummary(e.target.value) }}
        >
        </textarea>
        <div className="cover">
          <h3>Couverture :</h3>
          <input
            className='coverFileInput'
            type="file"
            name='cover'
            onChange={(e) => setFile(e.target.files[0])} />


        </div>

        <JoditEditor
          className='contentArea'
          ref={editor}
          value={content}
          onChange={(content) => setContent(content)}
        />
        {/* <ReactQuill
          className='contentArea'
          theme="snow"
          value={value}
          onChange={setValue}
          name='content'
        /> */}
        {error && <Error className='error'>{error}</Error>}
        <div className="BtnContainer">
          <Button disabled={isLoading} type={'submit'} value='Modifier' />

        </div>
      </Form>
    </Wrapper>
  )
}

export default EditPost
const Wrapper = styled.div`
padding: 1rem;
  h2{
    text-align: center;
    font-size: 3rem;
    padding: 2rem 1rem;
    font-weight: 300;
    }
@media (max-width: 936px){
  h2{
    font-size: 2.4rem;
  }
  Form{
    margin: 3rem;
    .title{
    font-size: 3rem;
  }
    h3{
      font-size: 1.4rem;
    }
    .categories{
      font-size: 1rem;
    }
  }

}
@media (max-width: 629px){
  h2{
    font-size: 2.4rem;
  }
  Form{
    margin: 3rem;
    .title{
    font-size: 2rem;
  }
    h3{
      font-size: 1.4rem;
    }
    .categories{
      font-size: 1rem;
    }
  }

}
`
const Form = styled.form`
  margin: 2rem 15rem;
  max-width: 100%;

  .title{
    font-size: 4rem;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    margin: 2rem 0;
  }
  h3{
    font-size: 1.4rem;
    font-weight: 400;
    margin: 1rem;
  }
  .categories{
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    gap: 1rem;
  }
  .categories label{
    padding-left: 0.6rem;
  }

  .cover .coverFileInput{
    font-size: 1rem;
  }
  .contentArea{
    margin: 2rem 0;
    background-color: #D9D9D9;
  }
  .BtnContainer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .summary{
    width: 80%;
    margin-top: 1rem;
    font-size: 1.2rem;
    outline: none;
    padding: 1rem;
    font-family:  Roboto, sans-serif, ;
  }
`
const Error = styled.p`
color: red;
font-weight: 500;
padding: 1rem;
text-align: center;
`