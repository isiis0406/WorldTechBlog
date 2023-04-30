import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { emailVerify, isLoading, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await emailVerify(email);

  }
  return (
    <Wrapper>
      <h2>
        Mot de passe oublié
      </h2>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder='E-mail'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
       />
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

export default ForgotPassword

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
const Error = styled.p`
    color: red;
    font-weight: 500;
    padding: 1rem;
    text-align: center;
`