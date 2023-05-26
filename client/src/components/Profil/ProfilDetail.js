import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

function ProfilDetail({ profilInfos }) {
  return (
    <Wrapper>
      <div>
        {profilInfos.name ? <p>{profilInfos.name}</p> : <p>Nom complet</p>}
        {profilInfos.title ? <p>{profilInfos.title}</p> : <p>Profil</p>}
        {profilInfos.hobby ? <p>{profilInfos.hobby}</p> : <p>hobby</p>}
      </div>
      <div className="socialIcons">
        {profilInfos.facebookUrl ? (
          <a href={"http://" + profilInfos.facebookUrl} target='_blank' rel='noopener noreferrer'>
            <FaFacebook />
          </a>
        ) : (
          <span></span>
        )}
        {profilInfos.instagramUrl ? (
          <a href={"http://" + profilInfos.instagramUrl} target='_blank' rel='noopener noreferrer'>
            <FaInstagram />
          </a>
        ) : (
          <span></span>
        )}
        {profilInfos.linkedInUrl ? (
          <a href={"http://" + profilInfos.linkedInUrl} target='_blank' rel='noopener noreferrer'>
            <FaLinkedin />
          </a>
        ) : (
          <span></span>
        )}
      </div>
    </Wrapper>
  )
}

export default ProfilDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 1rem;
  }

  .socialIcons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .socialIcons svg {
    font-size: 1.4rem;
    margin-right: 0.6rem;
    color: #000;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
