import { CirclePlay, ClockArrowUp, UsersRound } from "lucide-react";

interface iHeader {}

export default function Header({}: iHeader) {
  let numbers = "00:00:00";
  return (
    <div className="w-full  border-b-2 border-primary  flex flex-row justify-end items-center px-20 py-4">

      <div className="text-white flex flex-row items-center gap-16">
        <div className="text-white flex flex-row items-center gap-2 px-10 py-1  rounded-xl text-2xl">
          <CirclePlay
            size={44}
            className="text-emerald-400"
            strokeWidth={"1"}
          />
          <span style={{ lineHeight: "unset" }}> {numbers}</span>
        </div>

      </div>
    </div>
  );
}
