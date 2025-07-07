// src/components/Modal.jsx
import styled from 'styled-components';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>×</Close>
        {children}
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 10px; right: 15px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;
