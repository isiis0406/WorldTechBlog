import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import BannerImage from '../../assets/Images/devSombre.png';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { MdPhotoCamera } from 'react-icons/md';
import { Link } from 'react-router-dom';

function BannerProfil({ profilInfos }) {
  const { user } = useAuthContext();

  return (
    <Wrapper
      style={profilInfos.profilCoverImage !== undefined ?
        { backgroundImage: `url(${profilInfos.profilCoverImage})` } :
        { backgroundImage: `url(${BannerImage})` }}
    >
      {user && (
        <div className="editCoverPhoto">
          <Link to="/">
            <MdPhotoCamera />
          </Link>
        </div>
      )}
      <div className="profil">
        {profilInfos.profilImage ? (
          <img src={`${process.env.REACT_APP_API_ROUTE}/profil/${profilInfos.profilImage}`} alt="Profil" />
        ) : (
          <FaUserCircle />
        )}
      </div>
    </Wrapper>
  );
}

export default BannerProfil;

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  height: 30vh;
  position: relative;

  .profil {
    position: absolute;
    left: 12%;
    top: 40%;
    color: white;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .profil svg {
    font-size: 8rem;
  }

  .profil img {
    max-width: 100%;
    width: 12rem;
    border-radius: 100%;
  }

  .editCoverPhoto {
    position: absolute;
    right: 0;
    padding: 1rem;
    font-size: 1rem;
  }

  .editCoverPhoto a {
    color: white;
  }

  @media (max-width: 768px) {
    .profil svg {
      font-size: 6rem;
    }
    .profil{
      left: 8%;
    top: 60%;
    }

    .profil img {
      width: 8rem;
    }
  }
`;
