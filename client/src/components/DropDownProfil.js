import { useState, useEffect } from "react";
import React from 'react'
import { useAuthContext } from "../hooks/auth/useAuthContext";
import { FaUserCircle } from 'react-icons/fa';
import styled from "styled-components";



function DropDownProfil({handleProfil}) {
    const { user } = useAuthContext();
    const [profilInfos, setProfileInfos] = useState([]);

    useEffect(() => {
        getUserInfos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[user])
    
      //Fetch Profil Data
      const getUserInfos = async () => {
        if(user){
          const localUserInfos = JSON.parse(localStorage.getItem('user'));
          const localProfilInfos = localUserInfos.data.profilInfos
          setProfileInfos(localProfilInfos);
        }
    
      }

  return (
    <Wrapper>
         <div onClick={handleProfil} className='profil'>
          {profilInfos.profilImage ?
            <img 
            src={`${process.env.REACT_APP_API_ROUTE}/${profilInfos.profilImage}`}
            alt="Profil cover"
            ></img> :
            <FaUserCircle />
          }
          

        </div>
    </Wrapper>
  )
}

export default DropDownProfil

const Wrapper = styled.div`
    .profil{
        
    }
    img{
        max-width: 100%;
      width: 3rem;
      border-radius: 100%;
      margin-left: 2rem;
      cursor: pointer;
    }
    svg{
      font-size: 3rem;
      color: white;
      margin-left: 1rem;
      cursor: pointer;

    }
`