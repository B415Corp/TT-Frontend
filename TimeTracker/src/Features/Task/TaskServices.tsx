import Cookies from "js-cookie";

interface iTaskServices {}

export default function TaskServices({}: iTaskServices) {
  return <></>;
}

export async function GetTasks(page: number = 1, project_id: string) {
  console.log(project_id);
  const response = await fetch(
    (import.meta.env.VITE_DB +
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
  const response = await fetch(import.meta.env.VITE_DB + "/tasks/" + task_id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
}

export async function NewTaskService(taskName:string,project_id: string) {
  const response = await fetch(import.meta.env.VITE_DB + "/tasks/create", {
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
