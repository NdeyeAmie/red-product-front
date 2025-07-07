import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FormContext } from "../context/FormContext";

export default function SignUp() {
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const { prenom, email, password } = formData;
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prenom || !email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Adresse email invalide.");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (!terms) {
      toast.error("Vous devez accepter les termes et la politique.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prenom, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur d'inscription");
      }

      toast.success("Inscription réussie !");
      setTimeout(() => {
        resetFormData();
        navigate("/login");
      }, 800);
    } catch (error) {
      const msg = error.message.toLowerCase();

      if (msg.includes("email") && msg.includes("utilisé")) {
        toast.error("Cet email est déjà utilisé.");
      } else {
        toast.error("Erreur : " + error.message);
      }

      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Logo>
        <img
          src="/image/icon.png"
          alt="Logo Red Product"
          width={24}
          height={24}
          style={{ marginRight: "8px" }}
        />
        RED PRODUCT
      </Logo>

      <FormContainer onSubmit={handleSubmit} as="form">
        <Title>Inscrivez-vous en tant que Admin</Title>

        <Input
          type="text"
          placeholder="Nom"
          value={prenom}
          name="prenom"
          onChange={(e) => updateFormData("prenom", e.target.value)}
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          name="email"
          onChange={(e) => updateFormData("email", e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          name="password"
          onChange={(e) => updateFormData("password", e.target.value)}
        />

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <Label>Accepter les termes et la politique</Label>
        </CheckboxContainer>

        {/* <Button type="submit">S'inscrire</Button> */}
        <Button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S'inscrire"}
        </Button>
      </FormContainer>

      <LoginLink>
        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
      </LoginLink>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background: url(/image/back.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;

  * {
    margin: 0;
    box-sizing: border-box;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.8;
    z-index: 0;
  }

  * {
    position: relative;
    z-index: 1;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 2rem;
  width: 350px;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 1rem;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
  border-radius: 1px;
  font-size: 13px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Label = styled.label``;

const Button = styled.button`
  width: 100%;
  background: #333;
  color: #fff;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #fff;

  a {
    color: #ffd964;
    text-decoration: none;
    font-weight: bold;
  }
`;
