import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import AuthButton from "./AuthButton";
import logoImage from "../assets/images/anon-wall.png";

function MainHeader() {
  return (
    <MainHeaderContainer>
      <nav>
        <div>
          <Link to="/">
            <div className="logo">
              <img src={logoImage} />
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
  border-top: 3px solid black;
  border-left: 3px solid black;
  border-right: 3px solid black;

  nav {
    display: grid;
    grid-template-columns: 300px auto 50px;
    column-gap: 30px;
    align-items: center;
    height: 100%;
  }

  .logo {
    width: 65%;
    height: 65%;
    margin-left: 5rem;
    font-size: 2.5rem;

    img {
      width: 100%;
      height: 100%;
    }
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
    font-family: "yangjin";
    font-size: 2.5rem;
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
