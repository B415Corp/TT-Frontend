import Cookies from "js-cookie";

interface iUserServises {}

export default function UserServises({}: iUserServises) {
  return <></>;
}

export async function GetUser() {
  const response = await fetch(
    (import.meta.env.VITE_DB + "/users/me") as string,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("Token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();

  return res;
}
