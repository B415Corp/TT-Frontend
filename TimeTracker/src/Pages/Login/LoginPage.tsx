import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import MainButton from "../../UI/Kit/Buttons/MainButton";
import { useNavigate } from "react-router-dom";

interface iLoginPage {}

export default function LoginPage({}: iLoginPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {}) => {
    console.log("RESULT", data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-3 w-96"
      >
        <div className="flex items-center justify-center gap-4">
          <p className="text-3xl text-white">Войти</p>
          <LogIn className=" text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-1xl text-white">Электронная почта</label>
          <input
            className="peer bg-transparent h-10  rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            type="text"
            {...register("Email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <p className="text-sm text-white">
            {errors.Email && "Поле обязательно"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-1xl text-white">Пароль</label>
          <input
            type="password"
            className="peer bg-transparent h-10  rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-primary focus:outline-none"
            {...register("Password", { required: true, maxLength: 100 })}
          />
          <p className="text-sm text-white">
            {errors.Password && "Поле обязательно"}
          </p>
        </div>

        <MainButton>Войти</MainButton>

        <p
          className="text-sm text-white hover:underline cursor-pointer"
          onClick={() => {
            navigate("/registration");
          }}
        >
          Нет аккаунта? <br /> Зарегистрироваться
        </p>
      </form>
    </div>
  );
}
