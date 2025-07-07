import React, { useContext } from 'react'
import styled from 'styled-components';
import { FiSearch, FiLogOut, FiMenu } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function TopbarHotel({ toggleSidebar }) {
    const navigate = useNavigate();
  const { setUsers } = useContext(AuthContext); 

   const handleLogout = () => {
    localStorage.removeItem('token');       
    setUsers(null);                         
    navigate('/login');                     
  };

    return (
    <Bar>
       <Left>
              <MenuIcon onClick={toggleSidebar}>
                <FiMenu />
              </MenuIcon>
              <Title>Liste des hôtels </Title>
            </Left>
      {/* <Title></Title> */}

      <Actions>
        <Search>
          <FiSearch />
          <Input placeholder="Recherche" />
        </Search>

        <Notification>
          <FaBell />
          <Badge>3</Badge>
        </Notification>

        <Avatar src="/image/avata.jpeg" alt="Profil" />

        <Logout onClick={handleLogout}>
          <FiLogOut />
        </Logout>
      </Actions>
    </Bar>
  );
}

const Bar = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  border-bottom: 2px solid #ddd; 
  
  position: fixed;
  top: 0;
  left: 220px; // largeur de la sidebar
  right: 0;
  z-index: 1000;

   @media (max-width: 768px) {
    left: 0;
  }
`;

const Title = styled.h1`
  font-size: 1.1rem;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 20px;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
`;

const Notification = styled.div`
  position: relative;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -8px;
  background: red;
  color: white;
  font-size: 0.7rem;
  padding: 1px 4px;
  border-radius: 50%;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Logout = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
;`
