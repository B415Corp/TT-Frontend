import { Clock, Contact, Folder, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
interface iHeader {}

export default function Header({}: iHeader) {
  const [user, setUser] = useState<string | null>("Username");
  const nanvigate = useNavigate();
  return (
    <div className="w-full bg-header h-16 px-20  flex flex-row justify-between items-center">
      <div className="w-1/2 flex flex-row items-center">
        <Link to="/main" className="block text-white">
          <div className="flex items-center space-x-2    font-bold ">
            <Clock />
            <span className="text-xl">Учет времени</span>
          </div>
        </Link>
        <Link to="/projects" className="block text-accent2">
          <div className="flex items-center space-x-2 p-2 px-4 ml-16 hover:bg-accent rounded cursor-pointer">
            <Folder strokeWidth={1} />
            <span className="text-sm">Проекты</span>
          </div>
        </Link>
        <Link to="/clients" className="block text-accent2">
          <div className="flex items-center space-x-2 p-2  px-4 hover:bg-accent rounded cursor-pointer">
            <Contact strokeWidth={1} />
            <span className="text-sm">Клиенты</span>
          </div>
        </Link>
      </div>
      <div className="w-1/2 flex flex-row items-center gap-4 text-accent2 justify-end">
        <div>
          <span>Добро пожаловать, </span>
          {user}
        </div>
        <button
          onClick={() => {
            Cookies.remove("Token");
            nanvigate("/");
          }}
          className="flex items-center justify-center gap-2 bg-primary text-xs  text-white  py-2 px-3 rounded-xl hover:scale-105 duration-500"
        >
          <LogOut size={18} strokeWidth={1} />
          Выйти
        </button>
      </div>
    </div>
  );
}
