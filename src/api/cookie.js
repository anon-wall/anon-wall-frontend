import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function setCookie(name, value, options) {
  return cookies.set(name, value, { ...options });
}

export function getCookie(name) {
  return cookies.get(name);
}

export function removeCookie(name) {
  return cookies.remove(name);
}
