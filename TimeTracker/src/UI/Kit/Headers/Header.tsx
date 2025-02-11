import Cookies from "js-cookie";
import {
  BriefcaseBusiness,
  Clock,
  Contact,
  Folder,
  LogOut,
  NotebookPen,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetUser } from "../../../Features/User/UserServises";
interface iHeader {}
interface IUser {
  user_id: string;
  name: string;
  email: string;
  subscriptionType: string;
}

export default function Header({}: iHeader) {
  const [searchMode, setsearchMode] = useState<boolean>(false);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    GetUser().then((res) => {
      setUser(res.data);
    });
  }, []);

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
            <span className="text-sm">Ваши проекты</span>
          </div>
        </Link>
        <Link to="/sheared" className="block text-accent2">
          <div className="flex items-center space-x-2 p-2  px-4 hover:bg-accent rounded cursor-pointer">
            <BriefcaseBusiness strokeWidth={1} />
            <span className="text-sm">Общие проекты</span>
          </div>
        </Link>

        <Link to="/clients" className="block text-accent2">
          <div className="flex items-center space-x-2 p-2  px-4 hover:bg-accent rounded cursor-pointer">
            <Contact strokeWidth={1} />
            <span className="text-sm">Клиенты</span>
          </div>
        </Link>
        <Link to="/notes" className="block text-accent2">
          <div className="flex items-center space-x-2 p-2  px-4 hover:bg-accent rounded cursor-pointer">
            <NotebookPen strokeWidth={1} />
            <span className="text-sm">Заметки</span>
          </div>
        </Link>
      </div>
      <div className="w-1/2 flex flex-row items-center gap-4 text-accent2 justify-end">
        <div className="">
          {searchMode ? (
            <form
              onSubmit={(e) => {
                setsearchMode(!searchMode);
                e.preventDefault();
              }}
            >
              <input
                type="text"
                className="flex justify-center  bg-accent rounded-xl p-1 "
              />
            </form>
          ) : (
            <div
              className="flex items-center space-x-2 p-2 px-4 hover:bg-accent rounded cursor-pointer"
              onClick={() => setsearchMode(!searchMode)}
            >
              <span>Поиск </span>
              <Search />
            </div>
          )}
        </div>
        <div>
          <span>Добро пожаловать, </span>
          {user?.name}
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
