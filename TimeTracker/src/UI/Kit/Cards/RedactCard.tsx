import { Calendar, Check, CheckCheck, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface iRedactCard {
  setStarted: (string: string) => void;
}

export default function RedactCard({ setStarted }: iRedactCard) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <div className="flex flex-row w-full items-center py-1 px-2 justify-between text-white bg-slate-600 rounded-xl   gap-10  hover:bg-primary hover:rounded-xl">
        <div className="flex w-1/3 flex-row items-center gap-8">
          <button onClick={() => {}} className="w-12 h-12">
            <Pencil size={25} className=" text-white " strokeWidth={"1"} />
          </button>
          <div className="flex flex-col justify-center items-start ">
            <input
              type="text"
              placeholder="Описание"
              className="flex bg-accent rounded-xl p-1"
            />

            <span className="">{}</span>
          </div>
        </div>

        <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
          <Calendar size={24} />
          <div className="flex flex-col gap-1">
            <input type="date"  className="flex justify-center  bg-accent rounded-xl p-1"/>
            <input type="time" className="flex justify-center  bg-accent rounded-xl p-1"/>
          </div>
        </div>
        <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
          <p>
            <input list="cocktail"  className="w-12 flex justify-center  bg-accent rounded-xl p-1"></input>
          </p>
          <datalist id="cocktail">
            <option>rub</option>
            <option>usd</option>
          </datalist>
          <div className="flex flex-col gap-1">
            <span className="flex flex-row items-center gap-">
              <input type="text"  className="w-12 flex justify-center  bg-accent rounded-xl p-1" />{" "}
            </span>
          </div>
        </div>
        <div
          className="flex flex-row w-1/6  items-center gap-2 text-accent2 text-xs  overflow-hidden"
          onClick={() => {}}
        ></div>

        <div className="flex flex-row gap-2 ">
          <button
            type="submit"
            className="flex  items-center justify-center gap-2 bg-accent  text-green-500  p-2  rounded-xl "
          >
            <CheckCheck size={20} />
          </button>
          <button
            onClick={() => {
              setStarted("false");
            }}
            className="flex  items-center justify-center gap-2 bg-accent  text-red-500  p-2  rounded-xl "
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
