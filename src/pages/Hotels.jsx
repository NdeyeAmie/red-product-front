import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TopbarHotel from '../components/TopbarHotel'
import HotelList from '../components/HotelList';
import { useNavigate, useOutletContext } from 'react-router';

export default function Hotels() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const { toggleSidebar } = useOutletContext(); 

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
    

  const handleAddClick = () => {
    navigate('/formulaire');
  };
  return (
    <Container>
    <TopbarHotel toggleSidebar={toggleSidebar} />
    <BottomBox>
    <Row>
  <HotelCount>{hotels.length} hôtels</HotelCount>
  <AddButton onClick={handleAddClick}>+ Créer un nouveau hôtel </AddButton>
  </Row>
  <HotelList/>
</BottomBox>
</Container >
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
`;

const BottomBox = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Row = styled.div`
 margin-top: 3rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;

  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const HotelCount = styled.div`
  font-size: 0.85rem;
  color: #ccc;
`;

const AddButton = styled.button`
  background: white;
  color: #2e2e2e;
  border: 1px solid #AEAEAE;
 padding: 10px;
  font-size: 0.85rem;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

