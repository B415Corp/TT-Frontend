import Cookies from "js-cookie";

interface iNotesServices {}

export async function GetNotes(page: number = 1) {
  const response = await fetch(
    (import.meta.env.VITE_API_URL + "/notes/me" + "?page=" + page) as string,
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

export async function SetNewNotes(NoteName: string, NoteText: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/notes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: NoteName,
      text_content: NoteText,
    }),
  });
}

export async function DelNotes(NoteID: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/notes/" + NoteID, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
}



export async function RedactNotes(name: string, text_content: string , notes_id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/notes/" + notes_id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Cookies.get("Token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      text_content: text_content
    }),
  });
  const res = await response.json();
  return res;
}
