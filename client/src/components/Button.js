import React from 'react';
import styled from 'styled-components';

function Button({type, value}) {
  return (
    <Btn type ={type}>
      {value}
    </Btn>
  )
}

export default Button
const Btn = styled.button`
  background-color: #1D3557;
  color: #FFF;
  border-radius: 1.5rem;
  padding: 0.8rem 3rem;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  :hover{
    color:  #FFF;;
    background-color: #212A3E;
    transition: all 0.5ms ease-in;  
  }
  @media (max-width: 740;) {
    font-size: 1rem;
    padding: 0.6rem 2rem;
  }
`