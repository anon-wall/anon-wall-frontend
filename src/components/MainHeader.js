import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

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
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              고민 담벼락
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              나의 담벼락
            </NavLink>
          </li>
        </ul>
        <section>
          <div>login</div>
        </section>
      </nav>
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 130px;

  nav {
    display: grid;
    grid-template-columns: 150px auto 50px;
    align-items: center;
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
