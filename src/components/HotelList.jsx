// pages/HotelList.jsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// const hotels = [
//   {
//     name: "Hôtel Terrou-Bi",
//     address: "Boulevard Martin Luther King Dakar",
//     price: "25.000 XOF par nuit",
//     image: "/image/im1.jpg"
//   },
//   {
//     name: "Radisson Blu",
//     address: "Route de la Corniche Ouest, Dakar",
//     price: "32.000 XOF par nuit",
//     image: "/image/im2.jpg"
//   },
//   {
//     name: "King Fahd Palace",
//     address: "Les Almadies, Dakar",
//     price: "45.000 XOF par nuit",
//     image: "/image/im3.png"
//   },
//   {
//     name: "Novotel Dakar",
//     address: "Avenue Abdoulaye Fadiga, Dakar",
//     price: "28.000 XOF par nuit",
//     image: "/image/im4.jpg"
//   },
//   {
//     name: "Pullman Teranga",
//     address: "Place de l'Indépendance, Dakar",
//     price: "30.000 XOF par nuit",
//     image: "/image/im5.jpg"
//   },
//   {
//     name: "Yaas Hotel",
//     address: "Almadies, Dakar",
//     price: "18.000 XOF par nuit",
//     image: "/image/img.jpg"
//   },
//   {
//     name: "La Résidence",
//     address: "Route des Almadies, Dakar",
//     price: "20.000 XOF par nuit",
//     image: "/image/im7.jpg"
//   },
//   {
//     name: "International Hotel",
//     address: "Rue Carnot, Dakar Plateau",
//     price: "22.500 XOF par nuit",
//     image: "/image/im8.jpg"
//   },
// ];


export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('https://red-product-back-xfqn.onrender.com/api/hotels');
        const data = await res.json();
        // On ne garde que les champs utiles
        const trimmed = data.map(h => ({
          nom: h.nom,
          addresse: h.adresse,
          prix: h.prix,
          image:  h.photo || null
        }));
        setHotels(trimmed);
      } catch (err) {
        console.error('Erreur récupération hôtels :', err);
      }
    };
    fetchHotels();
  }, []);

  return (
    <Wrapper>
      <CardGrid>
        {hotels.map((hotel, index) => (
          <Card key={index}>
            <img src={hotel.image} alt={hotel.name} />
            <Info>
              <p>{hotel.addresse}</p>
              <h4>{hotel.nom}</h4>
              <Price>{hotel.prix} XOF par nuit</Price>
            </Info>
          </Card>
        ))}
      </CardGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem 2rem;
  background: #f2f2f2;
  flex-grow: 1;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // tablette
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; // mobile
  }
`;


const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;

  img {
    height: 180px;
    width: 100%;
    object-fit: cover;
    
      @media (max-width: 600px) {
    height: 140px;
  }
  }
`;

const Info = styled.div`
  padding: 1rem;

  h4 {
    margin: 0;
    font-size: 15px;
    color: #222;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
  }

  p {
    margin: 0.5rem 0;
    color: #8D4B38;
    font-size: 0.9rem;
  }
`;

const Price = styled.div`
  color: #000;
  margin-top: 0.5rem;
  font-size: 12px;
  // font-weight: 200;
  font-family : 'Roboto', sans-serif
`;
