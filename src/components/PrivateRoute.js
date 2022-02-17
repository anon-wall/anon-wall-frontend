import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Modal from "./common/Modal";

function PrivateRoute() {
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Modal width="50rem" height="20rem">
          <MessageWrapper>
            <div>로그인이 필요합니다.</div>
            <Link to="/">
              <button>홈으로</button>
            </Link>
          </MessageWrapper>
        </Modal>
      )}
    </>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 50px;
    padding: 5px;
    width: 80px;
    background-color: #95bcf0;
    border-radius: 3rem;
    border: none;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default PrivateRoute;
