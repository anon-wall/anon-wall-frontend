import React from "react";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

import StyledAuthButton from "./shared/StyledAuthButton";
import { login } from "../features/userSlice";
import { auth, provider } from "../api/firebase";

export default function LoginButton() {
  const dispatch = useDispatch();

  async function handleClickButton() {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const loginData = {
        email: user.email,
        name: user.displayName,
      };

      dispatch(login(loginData));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <StyledAuthButton onClick={handleClickButton}>로그인</StyledAuthButton>
  );
}
