/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



function UserVerify() {
    const [validUrl, setValidUrl] = useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        verifyEmailUrl();
    }, [])
    const verifyEmailUrl = async () => {
        try {
            const url = `${process.env.REACT_APP_API_ROUTE}/auth/users/${params.id}/verify/${params.token}`;
            await axios.get(url);
            setValidUrl(true);
            swal({
                title: "Succès!",
                text: 'Compte vérifié. ',
                icon: "success",
                button: "Ok",
            });
            navigate('/auth/login')


        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    }
    return (
        <Wrapper>
            {validUrl ?
                <div>
                    <Banner />
                    <h2>Mail vérifié avec succes</h2>
                    <div className="btnLogin">
                        <Link to="/auth/login">Se connecter</Link>
                    </div>
                </div>
                :
                <div>
                    <Banner />
                    <h2>404 Lien invalid</h2>
                </div>
            }
        </Wrapper>
    )
}

export default UserVerify;
const Wrapper = styled.div`
    h2{
        text-align: center;
        font-size: 2rem;
        text-transform: uppercase;
        padding: 2rem;
    }
    .btnLogin{
        display: flex;
        justify-content: center;
    }
    a{
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
    }
`