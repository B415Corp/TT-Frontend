import { CalendarDays, CheckCheck, Pen, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DelNotes, RedactNotes } from "../../../Features/Notes/Notes_services";
import Modal from "../PopUps/ProjectPopUp";
import { convertTimeFormat } from "./TaskCards";
import { enqueueSnackbar } from "notistack";

interface iNotesCards {
  notes_id: string;
  name: string;
  text_content: string;
  created_at: string;
  setDel: (del: number) => void;
}

export default function NotesCards({
  name,
  created_at,
  notes_id,
  text_content,
  setDel,
}: iNotesCards) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<{ name: string; text_content: string }>();

  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [isRedacted, setIsRedacted] = useState<boolean>(false);
  const closeModal2 = () => {
    setIsModalOpenDel(false);
  };

  const onSubmit = (data: { name: string; text_content: string }) => {
    RedactNotes(data.name, data.text_content, notes_id)
      .then((res) => {
        setIsRedacted(false);
        setDel(Date.now());
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  if (!isRedacted) {
    return (
      <div className="flex flex-row w-[32rem] h-40    bg-accent rounded-xl">
        <Modal isOpen={isModalOpenDel} close={closeModal2}>
          <div className="flex flex-col ">
            Вы действительно хотите удалить Заметку?
            <div className="flex flex-row gap-8">
              <button
                onClick={() => {
                  DelNotes(notes_id);
                  closeModal2();

                }}
                className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
              >
                Да
              </button>
              <button
                onClick={() => closeModal2()}
                className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
              >
                Нет
              </button>
            </div>
          </div>
        </Modal>

        <div className="flex w-full flex-col pl-4 py-2 gap-2 justify-between">
          <div className="flex  flex-row justify-between">
            <span className="text-white text-3xl">{name}</span>
            <div className="flex flex-row gap-1">
              <button
                onClick={() => setIsRedacted(true)}
                className="flex  items-center justify-center gap-2 bg-accent2  text-accent mx-2  p-2  rounded-xl "
              >
                <Pen size={20} />
              </button>
              <button
                onClick={() => setIsModalOpenDel(true)}
                className="flex  items-center justify-center  bg-accent2  text-red-500 mx-2  p-2  rounded-xl "
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="text-white">{text_content}</div>
          <div className="text-accent2 text-xs flex flex-row gap-1 justify-end mr-2  ">
            <CalendarDays size={16} strokeWidth={1} />
            <span>Создано </span>
            {convertTimeFormat(created_at)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row w-[32rem] h-40 bg-accent rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col pl-4 py-2 gap-2 justify-between"
        >
          <div className="flex  flex-row justify-between">
            <input
              type="text"
              placeholder="Название задачи"
              className="flex justify-center  bg-accent2 rounded-xl p-1 "
              {...register("name", { maxLength: 100 })}
            ></input>
            <div className="flex flex-row gap-1">
              <button
                onClick={() => {}}
                className="flex  items-center justify-center gap-2 bg-accent2  text-green-500 mx-2  p-2  rounded-xl "
              >
                <CheckCheck size={20} />
              </button>
              <button
                onClick={() => setIsRedacted(false)}
                className="flex  items-center justify-center  bg-accent2  text-red-500 mx-2  p-2  rounded-xl "
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Текст заметки"
            className="flex  justify-center  bg-accent2 rounded-xl p-2  mr-2 "
            {...register("text_content", { maxLength: 100 })}
          ></input>
          <div className="text-accent2 text-xs flex flex-row justify-end mr-2  gap-1 ">
            <CalendarDays size={16} strokeWidth={1} />
            <span>Создано </span>
            {convertTimeFormat(created_at)}
          </div>
        </form>
      </div>
    );
  }
}
