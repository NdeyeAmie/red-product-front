import React, { useState } from 'react';
import styled from 'styled-components';
import { FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function HotelForm() {
  // États pour chaque champ
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [prix, setPrix] = useState("");
  const [devise, setDevise] = useState("F XOF");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();


  // Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparation du FormData
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('adresse', adresse);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('prix', prix);
    formData.append('devise', devise);
    if (photo) formData.append('photo', photo);

    try {
      const response = await fetch('https://red-product-back-xfqn.onrender.com/api/hotels', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
  toast.success("Hôtel ajouté avec succès !");
  setTimeout(() => {
    navigate("/dashboard/hotels"); // Change ce chemin selon ta route réelle
  }, 2000); // 2 secondes pour laisser le temps au toast de s'afficher

  // Réinitialiser le formulaire
  setNom(""); setAdresse(""); setEmail("");
  setTelephone(""); setPrix(""); setDevise("F XOF");
  setPhoto(null);
} else {
  toast.error(data.message || "Erreur lors de l'ajout !");
}

    } catch (err) {
      console.error("Erreur ajout hôtel :", err);
    }
  };

  // Gestion de l'image
  const handleImageUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Wrapper>
      <FormContainer as="form" onSubmit={handleSubmit}>
        <Header>← CRÉER UN NOUVEAU HÔTEL</Header>

        <FormGrid>
          <Field>
            <Label>Nom de l’hôtel</Label>
            <Input
              type="text"
              placeholder="CAP Marniane"
              value={nom}
              onChange={e => setNom(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>Adresse</Label>
            <Input
              type="text"
              placeholder="Les îles du Saloum, Mar Lodj"
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="information@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>Numéro de téléphone</Label>
            <Input
              type="tel"
              placeholder="+221 77 777 77 77"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>Prix par nuit</Label>
            <Input
              type="text"
              placeholder="25 000 XOF"
              value={prix}
              onChange={e => setPrix(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>Devise</Label>
            <Select
              value={devise}
              onChange={e => setDevise(e.target.value)}
            >
              <option>F XOF</option>
              <option>€ EUR</option>
              <option>$ USD</option>
            </Select>
          </Field>
        </FormGrid>

        <PhotoLabel>Ajouter une photo</PhotoLabel>
        <ImageUpload>
          <FaImage size={32} />
          <p>{photo ? photo.name : "Cliquez ou glissez pour ajouter une photo"}</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageUpload>

        <ButtonContainer>
          <SaveButton type="submit">Enregistrer</SaveButton>
        </ButtonContainer>
      </FormContainer>
    </Wrapper>
  );
}

// ———————————————————————————————————————————————————
// Styles
// ———————————————————————————————————————————————————

// const Wrapper = styled.div`
//   background: #f7f7f7;
//   min-height: 100vh;
//   padding: 2rem;
//   display: flex;
//   justify-content: center;
//   font-family: 'Roboto', sans-serif;
// `;

const Wrapper = styled.div`
  background: #f7f7f7;
  height: 100vh; 
  width: 100vw;
overflow: hidden;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center; /* Centre verticalement */
  box-sizing: border-box;
  @media (max-width: 768px) {
    align-items: flex-start;
    overflow-y: auto;
    padding: 1rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

   @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.h2`
  font-size: 16px;
  color: #444;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
    @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const PhotoLabel = styled.label`
  display: block;
  margin: 2rem 0 0.5rem;
  font-size: 14px;
`;

const ImageUpload = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  height: 180px;
  color: #999;
  cursor: pointer;
  position: relative;

  input {
    display: none;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
  }

  svg {
    opacity: 0.6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  background-color: #444;
  color: white;
  padding: 0.7rem 1.5rem;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;
