import { ClockArrowUp } from "lucide-react";
import logo from "./../../../assets/logo/logo.png";
interface iLogoComponent {}

export default function LogoComponent({}: iLogoComponent) {
  return (
    <div className="flex flex-row justify-start items-center font-bold text-white text-xl px-2 py-4">
      {/* <ClockArrowUp size={46} /> */}
      <img className="w-12" src={logo} alt="" />
      <span>
        Time <br />
        Traker
      </span>
    </div>
  );
}
