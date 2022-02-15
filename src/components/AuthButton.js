import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

import StyledTransparentButton from "./shared/StyledTransparentButton";
import Modal from "./common/Modal";
import { login, logout } from "../features/userSlice";
import { auth, provider } from "../api/firebase";

function AuthButton() {
  const rejectedLoginError = useSelector(({ user }) => user.error);
  const isLoggedIn = useSelector(({ user }) => !user.isLoggedIn);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setErrorMessage(rejectedLoginError);
  }, [rejectedLoginError]);

  async function handleClickLoginButton() {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userData = {
        email: user.email,
      };
      dispatch(login(userData));
    } catch (err) {
      setErrorMessage(err);
    }
  }

  async function handleClickLogoutButton() {
    try {
      dispatch(logout());
    } catch (err) {
      setErrorMessage(err);
    }
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
        <Modal onClick={setErrorMessage} width="500px" height="200px">
          <p>{errorMessage}</p>
        </Modal>
      )}
    </>
  );
}

export default AuthButton;
