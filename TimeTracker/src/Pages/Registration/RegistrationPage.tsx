import { useQuery } from "@tanstack/react-query";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  iRegisterUser,
  RegisterUser,
} from "../../Features/Login_Registration/AuthServise";
import MainButton from "../../UI/Kit/Buttons/MainButton";
interface iRegistrationPage {}

export default function RegistrationPage({}: iRegistrationPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterUser>();

  const onSubmit = (data: iRegisterUser) => {
    RegisterUser(data);
  };
  console.log(errors);

  let navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 h-screen bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  gap-3 w-96"
        >
          <div className="flex items-center justify-center gap-4">
            <p className="text-3xl text-white">Зарегистрироваться</p>
            <UserRoundPlus className=" text-primary" />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-1xl text-white">Имя пользователя</label>
            <input
              className="peer bg-transparent h-10 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
              type="text"
              {...register("name", { required: true, maxLength: 80 })}
            />
            <p className="text-sm text-white">
              {errors.name && "Поле обязательно"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-1xl text-white">Пароль</label>
            <input
              type="password"
              className="peer bg-transparent h-10  rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
              {...register("password", { required: true, maxLength: 100 })}
            />
            <p className="text-sm text-white">
              {errors.password && "Поле обязательно"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-1xl text-white">Электронная почта</label>
            <input
              className="peer bg-transparent h-10  rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <p className="text-sm text-white">
              {errors.email && "Поле обязательно"}
            </p>
          </div>
          <MainButton>Зарегистрироваться</MainButton>

          <p
            className="text-sm text-white hover:underline cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Уже есть аккаунт?
          </p>
        </form>
      </div>
    </>
  );
}
