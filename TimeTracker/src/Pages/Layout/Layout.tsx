import { Outlet } from "react-router-dom";
import AsideLeft from "../../UI/Kit/Aside/AsideLeft";
import Header from "../../UI/Kit/Headers/Header";

interface iLayout {}

export default function Layout({}: iLayout) {
  return (
    <div className="flex flex-col   gap-2 h-screen bg-background">
      <div className="flex flex-row ">
        <AsideLeft></AsideLeft>
        <div className="flex flex-col w-full">
          <Header></Header>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
