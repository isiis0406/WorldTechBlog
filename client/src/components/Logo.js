import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/Wt-blog-Logo.png'
function Logo() {
  return (
    <Wrapper>
      <Link to='/'>
        <div className='items'>
          <img src={logo} alt="logo" />
        </div>
      </Link>
    </Wrapper>
  )
}

export default Logo

const Wrapper = styled.span`
    font-size: 2rem;
    color: #F1FAEE;
    font-weight: bold;
    a{
      color: #F1FAEE;
    }
    .items{
      display: flex;
      align-items: center;
    }
    img{
      width: 10rem;
    }
    span{
      color: #F1FAEE;
    }
`