import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export async function GetProjects() {
  const response = await fetch(import.meta.env.VITE_DB + "/projects/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res.data;
}

export async function SetNewProjects(projectName: string, userIds: string[]) {
  const response = await fetch(import.meta.env.VITE_DB + "/projects/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
      user_ids: userIds,
    }),
  });

  if (!response.ok) {
    // Обработка ошибки сервера
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message}`);
  }




  const data = await response.json();
  return data; // Возвращаем данные, если это необходимо
}

