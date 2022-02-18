import axios from "axios";
import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "../api/firebase";
import { ACCESS_TOKEN } from "../constants/home";

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

    localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);

    axios.defaults.headers.common[ACCESS_TOKEN] =
      localStorage.getItem(ACCESS_TOKEN);

    return data.data.user;
  } catch (err) {
    throw new Error("로그인에 실패하였습니다.");
  }
}

export async function getLoggedInUser() {
  try {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
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
