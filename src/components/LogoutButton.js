import React from "react";
import axios from "axios";

import StyledAuthButton from "./shared/StyledAuthButton";
import { auth } from "../api/firebase";

export default function LogoutButton() {
  async function handleClickButton() {
    try {
      await axios.get("/api/auth/logout");
      await auth.signOut();

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledAuthButton onClick={handleClickButton}>로그아웃</StyledAuthButton>
  );
}
