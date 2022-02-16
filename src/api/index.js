import axios from "axios";
import { signInWithPopup } from "firebase/auth";

import { setCookie, getCookie } from "./cookie";
import { auth, provider } from "../api/firebase";

export async function firebaseLogin() {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userData = {
      email: user.email,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/auth/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    setCookie("accessToken", data.data.accessToken, {
      path: "/",
      secure: true,
      expires,
    });

    return data.data.user;
  } catch (err) {
    throw new Error("로그인에 실패하였습니다.");
  }
}

export async function getLoginedUser() {
  try {
    if (!getCookie("accessToken")) {
      throw new Error("로그인이 필요합니다.");
    }

    const { data } = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users`,
      {
        withCredentials: true,
      }
    );

    return data.data.user;
  } catch (err) {
    throw new Error("로그인에 실패하였습니다.");
  }
}
