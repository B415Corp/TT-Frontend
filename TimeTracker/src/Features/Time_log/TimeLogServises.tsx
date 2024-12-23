import Cookies from "js-cookie";
interface iTimeLogServises {}

export default function TimeLogServises({}: iTimeLogServises) {
  return <></>;
}

export async function StartTimeLogs(task_id: string) {
  const response = await fetch(
    import.meta.env.VITE_DB + "/time-logs/" + task_id + "/start",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("Token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: task_id,
      }),
    }
  );
  const res = await response.json();
  return res;
}

export async function EndTimeLogs(task_id: string) {
  const response = await fetch(
    import.meta.env.VITE_DB + "/time-logs/" + task_id + "/stop",
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("Token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: task_id,
      }),
    }
  );
  const res = await response.json();
  console.log(res);
}

export async function GetTimeLogsAll(task_id: string) {
  const response = await fetch(
    import.meta.env.VITE_DB + "/time-logs/" + task_id + "/logs",
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
