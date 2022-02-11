import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

function Sidebar() {
  return (
    <>
      <SideBarContainer>
        <nav>
          <ul className="sidebar-link">
            <li>
              <NavLink
                to="/mypage/main"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                내정보
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypage/counselor"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                카운슬러
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypage/stories"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                나의 고민
              </NavLink>
            </li>
          </ul>
        </nav>
      </SideBarContainer>
      <Outlet />
    </>
  );
}

const SideBarContainer = styled.div`
  width: 20rem;
  height: 70rem;
  margin: 4rem 4rem;
  border: 0.7rem solid #bfaea4;
  border-radius: 3rem;

  .sidebar-link {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    margin: 9rem 0;
    padding: 0;
    height: 100%;
    list-style: none;
  }

  .sidebar-link li {
    font-size: 1.7rem;
    width: 15rem;
    margin: 3.5rem 0;
  }

  .sidebar-link a {
    color: black;
    text-decoration: none;
  }

  .sidebar-link a:hover,
  .sidebar-link a:active,
  .sidebar-link a.active {
    padding: 2rem;
    background-color: #e5e5e5;
    border-radius: 50px;
  }
`;

export default Sidebar;
