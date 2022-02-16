import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
      {isLoggedIn ? (
        <StyledTransparentButton onClick={handleClickLoginButton}>
          로그인
        </StyledTransparentButton>
      ) : (
        <StyledTransparentButton onClick={handleClickLogoutButton}>
          로그아웃
        </StyledTransparentButton>
      )}
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          <p>{errorMessage}</p>
        </Modal>
      )}
    </>
  );
}

export default AuthButton;
