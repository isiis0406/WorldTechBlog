import React from 'react';
import styled from 'styled-components';
import bannerUrl from '../assets/Images/devSombre.png'

function Banner() {
    return (
        <Wrapper>
            <span>DEV PRO</span>
        </Wrapper>
    )
}

export default Banner

const Wrapper = styled.div`
  
    background-image: url(${bannerUrl});
    background-repeat: no-repeat;
    background-size: cover;
    height: 50vh;
    position: relative;

    span{
        position: absolute;
        left: 26%;
        top: 28%;
        color: rgb(210,210,210);
        font-size: 3rem;
        font-weight: 600;
    }

`