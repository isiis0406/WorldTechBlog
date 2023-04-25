import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

function Navbar() {
  return (
    <Nav>
      <Logo/>
      <div className='nav-list'>
        <NavLink to="/">Acceuil</NavLink>
        <NavLink to="/add-post">Publier</NavLink>
        <NavLink to="/account">Mon compte</NavLink>
      </div>

    </Nav>
  )
}

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 3rem;
    height: 100px;
    background-color: #1D3557;

    .nav-list{
      display: flex;
      a{
        color: #ffffff;
        padding-left: 1rem;
        font-size: 1.5rem;
      }
    }
    
`
export default Navbar

