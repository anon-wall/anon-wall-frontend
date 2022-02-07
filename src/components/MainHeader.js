import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import AuthButton from "./AuthButton";

export default function MainHeader() {
  return (
    <MainHeaderContainer>
      <nav>
        <section>
          <Link to="/">
            <div className="logo">
              <h2>anon-wall</h2>
            </div>
          </Link>
        </section>
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
        </ul>
        <section>
          <AuthButton />
        </section>
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
    grid-template-columns: 150px auto 50px;
    column-gap: 30px;
    align-items: center;
    margin: 20px;
    height: 100%;
  }

  .mainHeader-link {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    height: 100%;
    list-style: none;
  }

  .mainHeader-link li {
    margin: 0 20px;
    width: 100px;
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
