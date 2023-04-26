import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Logo() {
  return (
    <Wrapper>
        <Link to='/'>WordTECH</Link>
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
`