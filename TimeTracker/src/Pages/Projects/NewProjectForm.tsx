import { useForm } from "react-hook-form";
import MainButton from "../../UI/Kit/Buttons/MainButton";
import { SetNewProjects } from "../../Features/Project/ProjectServices";

interface iNewProjectForm {
  close: () => void
}

export default function NewProjectForm({close}: iNewProjectForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{projectName: string, userIds: string[]}>();
  const onSubmit = (data:{projectName: string, userIds: string[]}) => {
    SetNewProjects(data.projectName, data.userIds);
    close();
  };
  return (
    <div>
      <div>Введите название проекта</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-3 w-96"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="peer bg-transparent h-10  rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            {...register("projectName", { required: true, maxLength: 100 })}
          />
          <p className="text-sm text-black">
            {errors.projectName && "Название проекта обязательно"}
          </p>
        </div>

        <MainButton>Создать</MainButton>
      </form>
    </div>
  );
}
