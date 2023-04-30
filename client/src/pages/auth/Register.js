import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useState } from 'react';
import { useRegister } from '../../hooks/auth/useRegister';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisibility] = useState(false);


  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email.toLowerCase(), password);

  }

  return (
    <Wrapper>
      <h2>
        Inscription
      </h2>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='E-mail'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <div className='password'>
          <input
            type={visible ? "text" : "password"}
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <div onClick={() => { setVisibility(!visible)}}>
          {visible ? <FaEyeSlash/> : <FaEye/>}

          </div>
        </div>
        {error && <Error className='error'>{error}</Error>}

        <div className="Btn" >
          <Button
            type={'submit'}
            value="M'inscrire"
            disabled={isLoading}
          />
        </div>
      </form>
    </Wrapper>
  )
}

export default Register

const Wrapper = styled.div`
  h2{
    margin-top: 4rem;
    text-align: center;
    font-size: 3rem;
    padding: 2rem 1rem;
    font-weight: 300;
    
  }
  form{
    margin-top: 2rem;
  }
  input{
      display: block;
      margin: auto;
      padding: 1rem;
      width: 30%;
      outline: none;
      margin-top: 1rem;
      font-size: 1.2rem;
      background-color: #D9D9D9;
      border: none;
    }
    .password{
      display: flex;
      position: relative;
      align-items: center;
    
    
    }
    .password svg{
      position: absolute;
      right: 37%;
      
      font-size: 1.2rem;
      cursor: pointer;
      top: 50%;
    }
    .Btn{
      display: flex;
      justify-content: center;
      margin: 2rem;
    }
    @media (max-width: 920px) {
      h2{
        font-size: 2rem;
      }
      input{
        width: 50%;
        font-size: 1rem;
      };
      .password svg{
      position: absolute;
      right: 28%;
    }
     
    }
`
const Error = styled.p`
    color: red;
    font-weight: 500;
    padding: 1rem;
    text-align: center;
`