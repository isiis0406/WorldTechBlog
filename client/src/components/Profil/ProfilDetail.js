import React from 'react';
import { Link } from 'react-router-dom';
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
                {profilInfos.facebookUrl ?
                    <Link to={"http://" + profilInfos.facebookUrl} target='_blank'>
                        <FaFacebook />
                    </Link> : <span></span>
                }
                {profilInfos.instagramUrl ?
                    <Link to={"http://" + profilInfos.instagramUrl} target='_blank'>
                        <FaInstagram />
                    </Link> : <span></span>
                }
                {profilInfos.linkedInUrl ?
                    <Link to={"http://" + profilInfos.linkedInUrl} target='_blank'>
                        <FaLinkedin />
                    </Link> : <span></span>
                }


            </div>
        </Wrapper>
    )
}

export default ProfilDetail
const Wrapper = styled.div`
    p{
        margin-bottom: 1rem;
    }
    .socialIcons svg{
        font-size: 1.4rem;
        margin-right: .6rem;
        color: #000;
    }
`