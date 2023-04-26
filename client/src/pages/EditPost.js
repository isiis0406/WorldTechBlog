import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../components/Button';

function EditPost() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    //
  }
  return (
    <Wrapper>
      <h2>Édition</h2>
      <Form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='Titre...' 
        className='title' 
        value={title} 
        onChange={(e)=> {setTitle(e.target.value)}}
        />

        <h3>Catégorie : </h3>
        <div className='categories'>
          <div>

            <input 
            type="radio" 
            name="category" 
            value="Développement"
            defaultChecked 
            onChange={(e)=> {setCategory(e.target.value)}}
            />
            <label htmlFor="huey">Développement</label>
          </div>
          <div>
            <input 
            type="radio" 
            name="category" 
            value="Design" 
            onChange={(e)=> {setCategory(e.target.value)}}
            />
            <label htmlFor="huey">Design</label>
          </div>
          <div>
            <input 
            type="radio" 
            name="category" 
            value="Astuces" 
            onChange={(e)=> {setCategory(e.target.value)}}
            />
            <label htmlFor="huey">Astuces</label>
          </div>
          <div>
            <input 
            type="radio" 
            name="category" 
            value="Librairie" 
            onChange={(e)=> {setCategory(e.target.value)}}
            />
            <label htmlFor="huey">Librairie</label>
          </div>
        </div>
        <div className="cover">
          <h3>Couverture :</h3>
          <input 
          className='coverFileInput' 
          type="file" 
          />
        </div>

        <ReactQuill 
        className='contentArea' 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        />
        <div className="BtnContainer">
        <Button  type={'submit'} value='Modifier' />

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

 

`