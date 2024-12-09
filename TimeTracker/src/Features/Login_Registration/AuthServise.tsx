import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export interface iRegisterUser {
  name: string;
  email: string;
  password: string;
}
export interface iLoginUser {
  email: string;
  password: string;
}

export function RegisterUser(cridentials: iRegisterUser) {
  fetch(import.meta.env.VITE_DB + "/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(cridentials),
  })
    .then((res) => {
      if (res.status === 201) {
        LoginUserUser({
          email: cridentials.email,
          password: cridentials.password,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function LoginUserUser(cridentials: iLoginUser) {
  fetch(import.meta.env.VITE_DB + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(cridentials),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      Cookies.set("Token", data.data.token);
      window.location.href = "/projects";
    })
    .catch((err) => {
      console.log(err);
      redirect("/login");
    });
}
