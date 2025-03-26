import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { SetNewNotes } from "../../Features/Notes/Notes_services";
import MainButton from "../../UI/Kit/Buttons/MainButton";

interface iNewProjectForm {
  close: () => void;
}

export default function NewNotesForm({ close }: iNewProjectForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ NoteName: string; NoteText: string }>();
  const onSubmit = (data: { NoteName: string; NoteText: string }) => {
    SetNewNotes(data.NoteName, data.NoteText)
      .then((res) => close())
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };
  return (
    <div>
      <div>Введите название заметки</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-3 w-96"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="peer bg-transparent h-10  rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            {...register("NoteName", { required: true, maxLength: 100 })}
          />
          <div>Введите текст заметки</div>
          <input
            type="text"
            className="peer bg-transparent h-10  rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            {...register("NoteText", { required: true, maxLength: 100 })}
          />
          <p className="text-sm text-black">
            {errors.NoteName && "Название заметки обязательно"}
          </p>
        </div>

        <MainButton>Создать</MainButton>
      </form>
    </div>
  );
}
