import {
  Bell,
  ChevronDown,
  Contact,
  Folder,
  Info,
  Tags,
  UsersRound,
} from "lucide-react";
import LogoComponent from "../Logo component/LogoComponent";
import { Link } from "react-router-dom";

interface iAsideLeft {}

export default function AsideLeft({}: iAsideLeft) {
  return (
    <div className="flex flex-row ">
      <div className="flex flex-col h-screen w-10 items-center justify-between py-4 text-white bg-accent2 ">
        <ChevronDown />
        <div className="flex flex-col gap-4">
          <UsersRound size={24} strokeWidth={1} />
          <Bell size={24} strokeWidth={1} />
          <Info size={24} strokeWidth={1} />
        </div>
      </div>
      <div className="flex flex-col justify-start h-screen  bg-accent px-2  gap-2 ">
        <LogoComponent></LogoComponent>
        <Link to="/projects" className="block text-white">
          <li className="flex items-center space-x-2 p-2 px-4 hover:bg-accent2 rounded cursor-pointer">
            <Folder strokeWidth={1} />
            <span className="text-sm">Проекты</span>
          </li>
        </Link>
        <Link to="/projects" className="block text-white">
          <li className="flex items-center space-x-2 p-2  px-4 hover:bg-accent2 rounded cursor-pointer">
            <Contact strokeWidth={1} />
            <span className="text-sm">Клиенты</span>
          </li>
        </Link >
        <Link to="/projects" className="block text-white">
          <li className="flex items-center space-x-2 p-2  px-4 hover:bg-accent2 rounded cursor-pointer">
            <Tags strokeWidth={1} />
            <span className="text-sm">Тэги</span>
          </li>
        </Link>
      </div>
    </div>
  );
}
