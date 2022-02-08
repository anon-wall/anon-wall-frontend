import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

import StyledTransparentButton from "./shared/StyledTransparentButton";
import Modal from "./common/Modal";
import { login, logout } from "../features/userSlice";
import { auth, provider } from "../api/firebase";

export default function AuthButton() {
  const rejectedLoginError = useSelector(({ user }) => user.error);
  const isLoggedIn = useSelector(({ user }) => !user.isLoggedIn);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(rejectedLoginError);
  }, [rejectedLoginError]);

  async function handleClickLoginButton() {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userData = {
        email: user.email,
      };
      dispatch(login(userData));
    } catch (err) {
      setIsError(err);
    }
  }

  async function handleClickLogoutButton() {
    try {
      dispatch(logout());
    } catch (err) {
      setIsError(err);
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
      {isError && (
        <Modal onClick={setIsError} width="500px" height="200px">
          <p>{isError}</p>
        </Modal>
      )}
    </>
  );
}
