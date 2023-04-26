import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import Logo from './Logo';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const handleClick = () => {
    setIsMobile(false);
  }
  return (
    <Nav>
      <Logo />
      <div
        className={isMobile ? 'nav-mobile-list' : 'nav-list'}
      >
        <NavLink to="/" onClick={handleClick} >Acceuil</NavLink>
        <NavLink to="/add-post" onClick={handleClick}>Publier</NavLink>
        <NavLink to="/account" onClick={handleClick}>Mon compte</NavLink>
      </div>
      <div
        className="nav-mobile-icons"
        
        >
        {isMobile && <FaTimes onClick={() => setIsMobile(false)} /> }
        {!isMobile &&  <FaBars onClick={() => setIsMobile(true)} />}

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
      @media screen and (max-width: 740px) {
          display: none;
        }
      a{
        color: #ffffff;
        padding-left: 1rem;
        font-size: 1.5rem;
        @media screen and (max-width: 740px) {
          color: white;
          text-align: center;
          padding: 1rem;
          width: 100%;
          transition: all 0.5s ease;

        }
      }
    }
    .nav-mobile-icons{
      display: none;
      @media screen and (max-width: 740px) {
          display: block;
          position: absolute;
          font-size: 2rem;
          color: white;
          background-color: #1D3557;
          border: none;
          outline: none;
          top: 2.2rem; 
          right: 2.4rem;

        }
    }
    .nav-mobile-list{
      z-index: 80;
      display: none;
      position: absolute; 
       display: flex;
       flex-direction: column;
      align-items: center;
        height: 100vh;  
      background-color: rgba(0,0,0, 0.8);
      left: 0;
      top: 100px; 
      transition: all 0.5s ease-out;
      width: 100%;
      padding: 1rem;
      a{
        padding: 2rem;
        font-size: 2rem;
        color: #ffffff;
        font-weight: bold;
      }
      


    }
    
    
    
`
export default Navbar

