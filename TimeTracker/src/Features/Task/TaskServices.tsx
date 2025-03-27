import Cookies from "js-cookie";
import { iFormData } from "../../UI/Kit/Cards/RedactCard";

interface iTaskServices {}

export default function TaskServices({}: iTaskServices) {
  return <></>;
}

export async function GetTasks(page: number = 1, project_id: string) {
  console.log(project_id);
  const response = await fetch(
    (import.meta.env.VITE_API_URL +
      "/tasks/" +
      project_id +
      "/tasks" +
      "?page=" +
      page) as string,
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

export async function DelTaskService(task_id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/tasks/" + task_id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
}

export async function NewTaskService(taskName: string, project_id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/tasks/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: taskName,
      project_id: project_id,
      description: "string",
      is_paid: true,
      payment_type: "hourly",
      rate: 0,
    }),
  });
  const res = await response.json();
  return res;
}

export async function IsPaidTaskServise(status: boolean, task_id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/tasks/" + task_id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_paid: status,
    }),
  });
  const res = await response.json();
  return res;
}

export async function CuranciesTaskServise() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/currencies", {
    method: "get",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
}

export async function RedactTaskService(data: iFormData, TaskID: string) {
  console.log(JSON.stringify({data}));
  const response = await fetch(import.meta.env.VITE_API_URL + "/tasks/" + TaskID , {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}
