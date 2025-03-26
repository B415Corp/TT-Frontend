import { CirclePlus, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DelNotes, GetNotes } from "../../Features/Notes/Notes_services";
import NotesCards from "../../UI/Kit/Cards/NotesCards";
import Modal from "../../UI/Kit/PopUps/ProjectPopUp";
import NewNotesForm from "./NewNotesForm";

interface iNotes {}

interface iNotesObject {
  notes_id: string;
  name: string;
  user_id: string;
  text_content: string;
  created_at: string;
  updated_at: string;
}

export default function Notes({}: iNotes) {
  const [notes, setNotes] = useState<iNotesObject[] | null>(null);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [del, setDel] = useState<number>(1);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchProjects();
  };
  let navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  async function fetchProjects() {
    try {
      const data = await GetNotes(pages);
      console.log(data);
      setNotes(data.data);

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [pages,del]);

  if (loading)
    return (
      <div className="flex h-screen w-full justify-center items-center text-white rota">
        <div className="flex justify-center items-center animate-spin">
          <LoaderCircle size={164} />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col bg-header mt-8 mx-20 rounded-xl p-8">
      <div className="flex flex-row justify-between h-8  ">
        <Modal isOpen={isModalOpen} close={closeModal}>
          <NewNotesForm close={closeModal}></NewNotesForm>
        </Modal>



        <div className="flex flex-col ">
          <span className="text-2xl text-white">Заметки</span>
          <span className="text-sm text-accent2">Показано {notes?.length}</span>
        </div>
        <button
          onClick={openModal}
          className="flex items-center justify-center gap-2 bg-primary  text-white  py-5 px-5 rounded-md "
        >
          <CirclePlus />
          Добавить Заметку
        </button>
      </div>

      <div className="flex flex-wrap gap-8 items-center justify-center  w-full pt-8  ">
        {notes?.map((notes: iNotesObject, index) => (
          <NotesCards
            key={notes.notes_id}
            name={notes.name}
            created_at={notes.created_at}
            notes_id={notes.notes_id}
            text_content={notes.text_content}
            setDel={setDel}
          ></NotesCards>
        ))}
      </div>
    </div>
  );
}
