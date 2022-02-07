import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import AuthButton from "./AuthButton";

export default function MainHeader() {
  return (
    <MainHeaderContainer>
      <nav>
        <div>
          <Link to="/">
            <div className="logo">
              <h2>anon-wall</h2>
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

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 130px;
  background-color: rgba(225, 219, 214, 1);

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
    padding: 0;
    height: 100%;
    list-style: none;
  }

  .mainHeader-link li {
    font-size: 1.7rem;
    width: 15rem;
  }

  .mainHeader-link a {
    color: black;
    text-decoration: none;
  }

  .mainHeader-link a:hover,
  .mainHeader-link a:active,
  .mainHeader-link a.active {
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
    color: #95bcf0;
  }
`;
