import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import { FaEye, FaEyeSlash } from "react-icons/fa";



function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisibility] = useState(false);

  const { reset, isLoading, error } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset(password, confirmPassword);

  }
  return (
    <Wrapper>
      <h2>
        Édition
      </h2>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className="password">
          <input
            type={visible ? "text" : "password"}
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <div onClick={() => { setVisibility(!visible) }}>
            {visible ? <FaEyeSlash /> : <FaEye />}

          </div>
        </div>
        <div className="password">
          <input
            type={visible ? "text" : "password"}
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
          <div onClick={() => { setVisibility(!visible) }}>
            {visible ? <FaEyeSlash /> : <FaEye />}

          </div>
        </div>
        {error && <Error className='error'>{error}</Error>}

        <div className="Btn" >
          <Button
            type={'submit'}
            value="Soumettre"
            disabled={isLoading}
          />
        </div>
        <div className='links'>
          <Link to='/auth/register'>Je n'ai pas encore de compte</Link>
          <Link to='/auth/login'>Me connecter</Link>
        </div>
      </form>
    </Wrapper>
  )
}

export default ResetPassword

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
      .password svg{
      position: absolute;
      right: 28%;
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
const Error = styled.p`
    color: red;
    font-weight: 500;
    padding: 1rem;
    text-align: center;
`