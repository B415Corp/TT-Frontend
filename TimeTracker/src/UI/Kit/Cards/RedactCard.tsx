import { Calendar, CheckCheck, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CuranciesTaskServise,
  RedactTaskService,
} from "../../../Features/Task/TaskServices";

interface iRedactCard {
  setStarted: (string: string) => void;
  task_id: string;
}

export interface iFormData {
  name?: string;
  // year?: string;
  // time?: string;
  // rate?: number;
  curancies?: string;
}

interface Currency {
  currency_id: number;
  name: string;
  user_id: number;
  code: string;
  symbol: string;
}

export default function RedactCard({ setStarted, task_id }: iRedactCard) {
  const { register, handleSubmit } = useForm<iFormData>();
  const [curencyList, setCurencyList] = useState<Currency[] | null>(null);
  const onSubmit = (data: iFormData) => {
    RedactTaskService(data, task_id);
    setStarted("false");
  };

  useEffect(() => {
    CuranciesTaskServise().then((res) => {
      setCurencyList(res.data);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row w-full items-center py-1 px-2 justify-between text-white bg-slate-600 rounded-xl   gap-10  hover:bg-primary hover:rounded-xl">
        <div className="flex w-1/3 flex-row items-center gap-8">
          <div className="flex items-center justify-center  w-12 h-12">
            <Pencil size={25} className=" text-white " strokeWidth={"1"} />
          </div>
          <div className="flex flex-col justify-center items-start ">
            <input
              type="text"
              placeholder="Название задачи"
              {...register("name", {})}
              className="flex bg-accent rounded-xl p-1"
            />

            <span className="">{}</span>
          </div>
        </div>

        <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
          <Calendar size={24} />
          <div className="flex flex-col gap-1">
            <input
              type="date"
              className="flex justify-center  bg-accent rounded-xl p-1"
              // {...register("year", {})}
            />
            <input
              type="time"
              className="flex justify-center  bg-accent rounded-xl p-1"
              // {...register("time", {})}
            />
          </div>
        </div>
        <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
          <p>
            <input
              list="curancies"
              className="w-12 flex justify-center  bg-accent rounded-xl p-1"
              {...register("curancies", {})}
            ></input>
          </p>
          <datalist id="curancies">
            {curencyList?.map((item) => (
              <option key={item.currency_id} value={item.code}>
                {item.code}
              </option>
            ))}
          </datalist>
          <div className="flex flex-col gap-1">
            <span className="flex flex-row items-center gap-">
              <input
                type="number"
                className="w-12 flex justify-center  bg-accent rounded-xl p-1"
                // {...register("rate", {})}
              />
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
