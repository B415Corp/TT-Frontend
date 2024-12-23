import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NewTaskService } from "../../Features/Task/TaskServices";
import MainButton from "../../UI/Kit/Buttons/MainButton";

interface iNewtaskForm {
  close: () => void;
  id: string;
}

export default function NewTaskForm({ close, id }: iNewtaskForm) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<{ taskName: string; userIds: string[] }>();

  useEffect(() => {
    setFocus("taskName");
  }, [setFocus]);



  const onSubmit = (data: { taskName: string; userIds: string[] }) => {
    NewTaskService(data.taskName, id)
      .then((res) => close())
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };
  return (
    <div>
      <div>Введите название задачи</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-3 w-96"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="peer bg-transparent h-10  rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            {...register("taskName", { required: true, maxLength: 100 })}
          />
          <p className="text-sm text-black">
            {errors.taskName && "Название задачи обязательно"}
          </p>
        </div>

        <MainButton>Создать</MainButton>
      </form>
    </div>
  );
}
