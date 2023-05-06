/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

import Button from '../../components/Button';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEditProfil } from '../../hooks/posts/useEditProfil';
import { useNavigate, useParams } from 'react-router-dom';


function EditProfil({profilInfos, setShowModal}) {

  const [name, setName] = useState(profilInfos.name);
  const [title, setTitle] = useState(profilInfos.title);
  const [hobby, setHobby] = useState(profilInfos.hobby);
  const [facebookUrl, setFacebookUrl] = useState(profilInfos.facebookUrl);
  const [instagramUrl, setInstagramUrl] = useState(profilInfos.instagramUrl);
  const [linkedInUrl, setLinkedinUrl] = useState(profilInfos.linkedInUrl);
  const [oldProfilImage, setOldProfilImage] = useState('');
  // const [oldProfilCoverImage, setOldProfilCoverImage] = useState('');
  const [file, setFile] = useState(null);

  const { EditProfil, isLoading, error } = useEditProfil();
  const params = useParams();
  const navigate = useNavigate();


  const { user } = useAuthContext();

  useEffect(() => {
    setOldProfilImage(profilInfos.profilImage)
  }, []);
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfil = {   
        name, 
        title, 
        hobby, 
        facebookUrl, 
        instagramUrl, 
        linkedInUrl,
        oldProfilImage
      };
    if (file) {
      const data = new FormData();
      const filename = Date.now().toString() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newProfil.profilImage = filename;

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
    await EditProfil(params.id, newProfil);
    
    setShowModal(false);
    navigate()
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
      <FaTimes onClick={() => setShowModal(false)}/>
      <h2>Édition</h2>
        <input
          type="text"
          placeholder='Nom complet'
        //   className='title'
          name='name'
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <input
          type="text"
          placeholder='Profil'
        //   className='title'
          name='title'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <input
          type="text"
          placeholder='Hobby'
        //   className='title'
          name='hobby'
          value={hobby}
          onChange={(e) => { setHobby(e.target.value) }}
        />
        <input
          type="text"
          placeholder='Lien du profil facebook'
        //   className='title'
          name='facebookUrl'
          value={facebookUrl}
          onChange={(e) => { setFacebookUrl(e.target.value) }}
        />
        <input
          type="text"
          placeholder='Lien du profil instagram'
        //   className='title'
          name='instagramUrl'
          value={instagramUrl}
          onChange={(e) => { setInstagramUrl(e.target.value) }}
        />
        <input
          type="text"
          placeholder='Lien du profil linkedIn'
        //   className='title'
          name='linkedInUrl'
          value={linkedInUrl}
          onChange={(e) => { setLinkedinUrl(e.target.value) }}
        />

       
        <div className="cover">
          <h3>Image de profil :</h3>
          <input
            className='coverFileInput'
            type="file"
            name='profilImage'
            onChange={(e) => setFile(e.target.files[0])} />

        
        </div>
        {error && <Error className='error'>{error}</Error>}
        <div className="BtnContainer">
          <Button disabled={isLoading} type={'submit'} value='Modifier' />

        </div>
      </Form>
    </Wrapper>
  )
}

export default EditProfil
const Wrapper = styled.div`
padding: 1rem; 
position: relative;

  h2{
    text-align: center;
    font-size: 3rem;
    padding: 2rem 1rem;
    font-weight: 300;
    }
  svg{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    margin: 1rem;
    cursor: pointer;
  }
@media (max-width: 936px){
  h2{
    font-size: 2.4rem;
    padding: 1rem;
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
    .BtnContainer{
      font-size: 1rem;
    }
  }
  input{
    width: 100%;

  }

}
`
const Form = styled.form`
  margin: 0rem 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  

  input{
    font-size: 1rem;
    border: 1px solid #1D3557; 
    border-radius: .6rem;
    outline: none;
    margin: 0.4rem 0;
    padding-right:  4rem;
    padding-left: 1rem;
    padding-top: 1rem ;
    padding-bottom: 1rem;
    width: 80%;
    /* text-align: left; */
  }
  .cover{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h3{
    font-size: 1.4rem;
    font-weight: 400;
    margin: 1rem;
  }
  
  .image .coverFileInput{
    /* font-size: 1rem;
    border: none; */
  }
  .contentArea{
    margin: 2rem 0;
    background-color: #D9D9D9;
  }
  .BtnContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
  }
`
const Error = styled.p`
color: red;
font-weight: 500;
padding: 1rem;
text-align: center;
`