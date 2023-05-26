import React from 'react';
import styled from 'styled-components';

function Modal({ children, showModal, setShowModal }) {
  if (!showModal) return null;
  return (
    <>
      <ModalOverlay />
      <ModalWrapper setShowModal={setShowModal}>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </>
  );
}

export default Modal;

const ModalWrapper = styled.div`
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  z-index: 1000;
  height: auto; /* Modifier la hauteur pour qu'elle s'adapte au contenu */
  width: 80%;
  max-height: 95%; /* Limiter la hauteur maximale de la modal */
  overflow-y: auto; /* Ajouter une barre de défilement si nécessaire */
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalContent = styled.div`
  /* Ajoutez des styles supplémentaires au contenu de la modal si nécessaire */
`;
