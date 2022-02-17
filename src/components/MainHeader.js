import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import AuthButton from "./AuthButton";

function MainHeader() {
  return (
    <MainHeaderContainer>
      <nav>
        <div>
          <Link to="/">
            <div className="logo">
              <h2>Anon-Wall</h2>
            </div>
          </Link>
        </div>
        <ul className="mainHeader-link">
          <li>
            <NavLink
              to="/counsels"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              고민 담벼락
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              나의 담벼락
            </NavLink>
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </nav>
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.header`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.mainHeader_bg};
  border-bottom: 1px solid black;

  nav {
    display: grid;
    grid-template-columns: 300px auto 50px;
    column-gap: 30px;
    align-items: center;
    height: 100%;
  }

  .logo {
    margin-left: 5rem;
    font-size: 2.5rem;
  }

  .mainHeader-link {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0;
    list-style: none;
  }

  .mainHeader-link li {
    width: 15rem;
    font-size: 1.7rem;
  }

  .mainHeader-link a {
    color: black;
    text-decoration: none;
  }

  .mainHeader-link a:hover,
  .mainHeader-link a:active,
  .mainHeader-link a.active {
    padding-bottom: 0.25rem;
    border-bottom: 4px solid ${({ theme }) => theme.colors.nav_active_color};
    color: ${({ theme }) => theme.colors.nav_active_color};
  }
`;

export default MainHeader;
