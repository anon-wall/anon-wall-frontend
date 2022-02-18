import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Modal from "./common/Modal";
import StyledTransparentButton from "./shared/StyledTransparentButton";
import { login, logout } from "../features/userSlice";

function AuthButton() {
  const isLoggedIn = useSelector(({ user }) => !user.isLoggedIn);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(false);

  function handleClickLoginButton() {
    dispatch(login(setErrorMessage));
  }

  function handleClickLogoutButton() {
    dispatch(logout());
  }

  return (
    <>
      <ButtonStyle>
        {isLoggedIn ? (
          <StyledTransparentButton onClick={handleClickLoginButton}>
            로그인
          </StyledTransparentButton>
        ) : (
          <StyledTransparentButton onClick={handleClickLogoutButton}>
            로그아웃
          </StyledTransparentButton>
        )}
      </ButtonStyle>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          <p>{errorMessage}</p>
        </Modal>
      )}
    </>
  );
}

const ButtonStyle = styled.div`
  @font-face {
    font-family: "yangjin";
    src: url("https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  button {
    font-family: "yangjin";
    font-size: 2.5rem;
  }
`;

export default AuthButton;
