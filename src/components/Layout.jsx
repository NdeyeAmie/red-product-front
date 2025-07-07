// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Topbar />
        <MainArea>
          <Outlet />
        </MainArea>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainArea = styled.main`
  margin-top: 60px; // pour laisser de l'espace à la Topbar (fixed)
  height: calc(100vh - 60px);
  overflow-y: auto;
  background: #f6f6f6;
  padding: 20px 30px;
`;
