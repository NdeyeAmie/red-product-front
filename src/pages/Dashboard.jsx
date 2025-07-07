// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { Outlet } from 'react-router';

export default function Dashboard() {
const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <Content $isSidebarOpen={isSidebarOpen}>
        {/* <Main /> */}
        <Outlet context={{ toggleSidebar }} />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
border : 1px solid red;
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 220px;
  transition: padding-left 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;
