import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Wrapper>
      <h2>
        Connexion
      </h2>
      <form className='form'>
        <input 
        type="text" 
        placeholder='E-mail' 
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
        />
        <input 
        type="password" 
        placeholder='Mot de passe' 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        />
        <div className="Btn" >
        <Button type={'submit'} value="Me connecter"/>
        </div>
        <div className='links'>
          <Link to='/auth/register'>Je n'ai pas encore de compte</Link>
          <Link to='/'>Mot de passe oublié</Link>
        </div>
      </form>
    </Wrapper>
  )
}

export default Login

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
    .Btn{
      display: flex;
      justify-content: center;
      margin: 2rem;
    }
    .links{
      display: flex;
      justify-content: center;
      a{
        color: #000000;
        padding-right: 1rem;
        text-decoration: underline;
      }
    }
    @media (max-width: 920px) {
      h2{
        font-size: 2rem;
      }
      input{
        width: 50%;
        font-size: 1rem;
      };
      .links{
        flex-direction: column;
        align-items: center;
      }
      .links  a{
        font-size: 0.8rem;
        margin-bottom: 0.4rem;
      }
    }
`