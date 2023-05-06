import React from 'react';
import styled from 'styled-components';

function Modal({ children, showModal, setShowModal }) {
    if (!showModal) return null
    return (
        <>
            <ModalOverlay />
            <ModalWrapper setShowModal= {setShowModal}>
                {children}
            </ModalWrapper>
        </>
    )
}

export default Modal;

const ModalWrapper = styled.div`
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    /* margin: 2rem; */
    z-index: 1000;
    height: 95%;
    width: 80%;
`
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 1000;
`