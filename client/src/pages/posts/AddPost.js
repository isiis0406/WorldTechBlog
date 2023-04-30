import React, { useEffect, useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

import styled from 'styled-components';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import Button from '../../components/Button';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useAddPost } from '../../hooks/posts/useAddPost';


function AddPost() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [file, setFile] = useState(null);


  const { addPost, isLoading, error } = useAddPost();
 
  //RichText Editor
  const editor = useRef(null);
  



  const { user } = useAuthContext();


  useEffect(() => {
    setAuthorId(user.data.UserID);
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newpost = { title, category, authorId, content };
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
          Authorization : `Bearer ${user.data.token}`
        }});

      } catch (error) {
        console.log(error.message);
      }
    }
    await addPost(newpost);
  }
  return (
    <Wrapper>
      <h2>Nouveau post</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Titre...'
          className={'title'} 
          name='title'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />

        <h3>Catégorie : </h3>
        <div className='categories'>
          <div>

            <input
              type="radio"
              name="category"
              value="Développement"
              
              onChange={(e) => { setCategory(e.target.value) }}
            />
            <label htmlFor="huey">Développement</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Design"
              onChange={(e) => { setCategory(e.target.value) }}
            />
            <label htmlFor="huey">Design</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Astuces"
              onChange={(e) => { setCategory(e.target.value) }}
            />
            <label htmlFor="huey">Astuces</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="Librairie"
              onChange={(e) => { setCategory(e.target.value) }}
            />
            <label htmlFor="huey">Librairie</label>
          </div>
        </div>
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
        onChange={(content) => setContent(content)}
        placeholder='Écrit ici'
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
          <Button disabled={isLoading} type={'submit'} value='Publier' />

        </div>
      </Form>
    </Wrapper>
  )
}

export default AddPost
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
`
const Error = styled.p`
color: red;
font-weight: 500;
padding: 1rem;
text-align: center;
`