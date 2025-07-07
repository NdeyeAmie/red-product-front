// src/components/Main.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaUsers, FaBuilding, FaWpforms, FaHotel } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import Topbar from './Topbar';
import { useOutletContext } from 'react-router';

export default function Main() {
    const [users, setUsers] = useState([]);
    const [hotels, setHotels] = useState([]);
   const { toggleSidebar } = useOutletContext();

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/api/users/allusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Données reçues :", data);
      
      if (res.ok) {
        setUsers(data); // Si data est un tableau
      } else {
        console.error("Erreur API :", data.message);
      }

    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  fetchUsers();
}, []);


useEffect(() => {
  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/hotels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setHotels(data); // suppose que data est un tableau
      } else {
        console.error("Erreur API hôtels :", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des hôtels :", error);
    }
  };

  fetchHotels();
}, []);


  return (
    <Container>
      <Topbar toggleSidebar={toggleSidebar}/>
        <Welcome>
        <h4>Bienvenue sur RED Product</h4>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        </Welcome>
      <MainContent>
        <Cards>
          <Card $bg="#A78BFA"><FaEnvelope /><div><strong>125</strong> Formulaires<br /><span>Je ne sais pas quoi mettre</span></div></Card>
          <Card $bg= "#0CC2AA"><MdMessage /><div><strong>40</strong> Messages<br /><span>Je ne sais pas quoi mettre</span></div></Card>
          <Card $bg="#FCC100"><FaUsers /><div><strong>{users.length}</strong> Utilisateurs<br /><span>Je ne sais pas quoi mettre</span></div></Card>
          <Card $bg="#F90000"><FaEnvelope /><div><strong>25</strong> E-mails<br /><span>Je ne sais pas quoi mettre</span></div></Card>
          <Card $bg="#9C27B0"><FaHotel /><div><strong>{hotels.length}</strong> Hôtels<br /><span>Je ne sais pas quoi mettre</span></div></Card>
          <Card $bg="#1565C0"><FaBuilding /><div><strong>02</strong> Entités<br /><span>Je ne sais pas quoi mettre</span></div></Card>
        </Cards>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
border : 1px solid red;
  flex: 1;
  height: 100%;
  background: #f6f6f6;
  overflow-y: auto;
  padding-top: 60px;
`;

const Welcome = styled.div`
  height: 70px;
  background: white;
  // margin-top: 4rem;
  padding: 0 2rem;*
  font-family: 'Roboto';
  

  h4 {
    margin: 0;
    font-size: 1.1rem;
    color: #111;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
  }
`;


const MainContent = styled.div`
  padding: 10px 30px 30px 30px; // espace sous Topbar
  box-sizing: border-box;
`;




const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;

    @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  color: #333;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  svg {
    background: ${props => props.$bg || '#e0e0e0'};
    padding: 10px;
    border-radius: 50%;
    color: white;
    font-size: 24px;
  }

  strong {
    font-size: 1.5rem;
    color: #000;
  }

  span {
    color: #666;
    font-size: 0.8rem;
  }
`;


