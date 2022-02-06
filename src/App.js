import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import MainHeader from "./components/MainHeader";

export default function App() {
  return (
    <div>
      <MainHeader />
      <Main>
        <Routes>
          <Route path="/" />
          <Route path="/counsels/*">
            <Route path=":counsel_id/*" />
            <Route path=":counsel_id/counselors/:user_id" />
            <Route path=":counsel_id/room" />
          </Route>
          <Route path="/counsels/new" />
          <Route path="/mypage">
            <Route path="/mypage/counselor" />
            <Route path="/mypage/stories" />
          </Route>
        </Routes>
      </Main>
    </div>
  );
}

const Main = styled.main`
  margin: 20px;
`;
