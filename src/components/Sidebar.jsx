import React from 'react';
import styled from 'styled-components';
import { FaTh, FaHotel } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



export default function Sidebar({ isOpen, setIsOpen }) {
  const { users } = useContext(AuthContext);

     const location = useLocation();
  return (
    <Container $isOpen={isOpen}>
      <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
      <Logo>
        <img
                 src="/image/icon.png"
                 alt="Logo Red Product"
                 width={24}
                 height={24}
                 
                 />
        RED PRODUCT</Logo>
        <p style={{margin : 20}}>principal</p>
      <Nav>
        <StyledLink to="/dashboard" $active={location.pathname === '/dashboard'}>
          <MdDashboard /> Dashboard
        </StyledLink>
        <StyledLink to="/dashboard/hotels" $active={location.pathname === '/dashboard/hotels'}>
          <FaHotel /> Liste des hôtels
        </StyledLink>
      </Nav>
      <UserSection>
        <UserImage src="/image/avata.jpeg" alt="Mouhamet Badiane" />
        <UserInfo>
          <strong>{users?.prenom || "Utilisateur"}</strong>
          <Status>● en ligne</Status>
        </UserInfo>
      </UserSection>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid red;
  width: 220px;
  background: #2e2e2e;
  color: white;
  display: flex;
  flex-direction: column;

  // Par défaut (desktop) — pas de position fixed
  position: fixed;
  height: 100vh;
  transform: translateX(0);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;


const Logo = styled.div`
  display: flex;        
  align-items: center;   
  gap: 10px;            
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Nav = styled.div`
  padding: 10px 0;
 
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  text-decoration: none;
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  color: ${({ $active }) => ($active ? '#2e2e2e' : 'white')};

  svg {
    color: ${({ $active }) => ($active ? '#2e2e2e' : 'white')};
  }

  &:hover {
    background: ${({ $active }) => ($active ? 'white' : '#444')};
    color: ${({ $active }) => ($active ? '#2e2e2e' : 'white')};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
   margin-top : 20rem;
  //  margin-top: auto;
  padding: 20px;

`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  font-size: 0.85rem;
`;

const Status = styled.div`
  color: #4cd964;
`;

const CloseButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    align-self: flex-end;
  }
`;