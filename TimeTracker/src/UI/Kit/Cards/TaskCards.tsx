import {
  Calendar,
  Check,
  CirclePause,
  CirclePlay,
  DollarSign,
  Pen,
  Trash2,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DelTaskService,
  IsPaidTaskServise,
} from "../../../Features/Task/TaskServices";
import { formatTime } from "../../../Features/Time_log/StopWatch";
import {
  EndTimeLogs,
  GetTimeLogsAll,
  StartTimeLogs,
} from "../../../Features/Time_log/TimeLogServises";
import Modal from "../PopUps/ProjectPopUp";
import RedactCard from "./RedactCard";

interface iProjectCards {
  project_id: string;
  name: string;
  // client_id: string;
  // user_ids: string[];
  // user_owner_id: string;
  created_at: string;
  // updated_at: string;
  is_paid: boolean;
  del: string;
  setDel: (del: string) => void;
  task_id: string;
}

export default function TaskCards({
  name,
  created_at,
  project_id,
  del,
  setDel,
  task_id,
  is_paid,
}: iProjectCards) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isStarted, setIsStarted] = useState<string>("false");
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [ispaid, setispaid] = useState<boolean>(is_paid);
  useEffect(() => {
    GetTimeLogsAll(task_id).then((res) => {
      console.log(res.data[0].status);
      if (res.data[0].status == "in-progress") {
        setIsActive(true);
        setIsStarted("true");
      }

      let resault = 0;
      res.data.forEach((el: { duration: number }) => {
        resault += Math.round(el.duration / 1000);
      });
      console.log(resault, "server", task_id);
      setTime(resault);
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  switch (isStarted) {
    case "false":
      return (
        <div className="flex flex-row w-full items-center py-1 px-2 justify-between text-white   gap-10  hover:bg-primary hover:rounded-xl">
          <Modal isOpen={isModalOpen} close={closeModal}>
            <div className="flex flex-col">
              Вы действительно хотите удалить задачу?
              <div className="flex flex-row gap-8">
                <button
                  onClick={() => {
                    DelTask(del, setDel, task_id);
                    closeModal();
                  }}
                  className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
                >
                  Да
                </button>
                <button
                  // onClick={() => DelTask(del, setDel, task_id)}
                  onClick={() => closeModal()}
                  className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
                >
                  Нет
                </button>
              </div>
            </div>
          </Modal>
          <div className="flex w-1/3 flex-row items-center gap-8">
            <button
              onClick={() => {
                startTask(task_id).then((res) => {
                  if (res.statusCode == 409) {
                    enqueueSnackbar("Только одно задание может быть запущено", {
                      variant: "error",
                    });
                  } else {
                    setIsStarted("true"), setIsActive(true);
                  }
                });
              }}
            >
              <CirclePlay
                size={50}
                className="text-white bg-emerald-400 rounded-full "
                strokeWidth={"1"}
              />
            </button>
            <div className="flex flex-col items-start gap-2">
              <span className="text-accent2" style={{ lineHeight: "unset" }}>
                {formatTime(time)}
              </span>
              <span className="">{name}</span>
            </div>
          </div>

          <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
            <Calendar size={24} />

            {convertTimeFormat(created_at)}
          </div>
          <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
            <DollarSign size={24} />
            <div className="flex flex-col gap-1">
              <span> Ставка:$ 0 </span>
              <span> Всего:$ 0 </span>
            </div>
          </div>
          <div
            className="flex flex-row w-1/6 cursor-pointer items-center gap-2 text-accent2 text-xs  overflow-hidden"
            onClick={() => {
              IsPaidTaskServise(!ispaid, task_id);
              setispaid(!ispaid);
            }}
          >
            {ispaid ? (
              <div className=" flex flex-row  items-center gap-2 text-green-500 text-xs  overflow-hidden">
                <Check size={24} />
                <span> Оплачено </span>
              </div>
            ) : (
              <div className=" flex flex-row  items-center gap-2 text-red-500 text-xs  overflow-hidden">
                <Check size={24} />
                <span>Не оплачено </span>
              </div>
            )}
          </div>

          <div className="flex flex-row  gap-2">
            <button
              // onClick={() => DelTask(del, setDel, task_id)}
              onClick={() => {
                setIsStarted("redact");
              }}
              className="flex  items-center justify-center gap-2 bg-accent  text-accent2  p-2  rounded-xl "
            >
              <Pen size={20} />
            </button>
            <button
              // onClick={() => DelTask(del, setDel, task_id)}
              onClick={openModal}
              className="flex  items-center justify-center gap-2 bg-accent  text-red-500  p-2  rounded-xl "
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      );
    case "true":
      return (
        <div className="flex flex-row w-full items-center py-1 px-2 justify-between text-white   gap-10  hover:bg-primary hover:rounded-xl">
          <Modal isOpen={isModalOpen} close={closeModal}>
            <div className="flex flex-col">
              Вы действительно хотите удалить задачу?
              <div className="flex flex-row gap-8">
                <button
                  onClick={() => {
                    DelTask(del, setDel, task_id);
                    closeModal();
                  }}
                  className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
                >
                  Да
                </button>
                <button
                  onClick={() => DelTask(del, setDel, task_id)}
                  className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
                >
                  Нет
                </button>
              </div>
            </div>
          </Modal>
          <div className="flex w-1/3 flex-row items-center gap-8">
            <button
              onClick={() => {
                endTask(task_id), setIsStarted("false"), setIsActive(false);
              }}
            >
              <CirclePause
                size={50}
                className="bg-red-400 text-white rounded-full"
                strokeWidth={"1"}
              />
            </button>
            <div className="flex flex-col items-start gap-2">
              <span className="text-accent2" style={{ lineHeight: "unset" }}>
                {formatTime(time)}
              </span>
              <span className="">{name}</span>
            </div>
          </div>

          <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
            <Calendar size={24} />

            {convertTimeFormat(created_at)}
          </div>
          <div className="flex flex-row  items-center gap-2 text-accent2 text-xs  overflow-hidden">
            <DollarSign size={24} />
            <div className="flex flex-col gap-1">
              <span> Ставка:$ 0 </span>
              <span> Всего:$ 0 </span>
            </div>
          </div>
          <div
            className="flex flex-row w-1/6  items-center gap-2 text-accent2 text-xs  overflow-hidden"
            onClick={() => {
              IsPaidTaskServise(!ispaid, task_id);
              setispaid(!ispaid);
            }}
          >
            {ispaid ? (
              <div className=" flex flex-row  items-center gap-2 text-green-500 text-xs  overflow-hidden">
                <Check size={24} />
                <span> Оплачено </span>
              </div>
            ) : (
              <div className=" flex flex-row  items-center gap-2 text-red-500 text-xs  overflow-hidden">
                <Check size={24} />
                <span>Не оплачено </span>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-2 ">
            <button
              // onClick={() => DelTask(del, setDel, task_id)}
              onClick={openModal}
              className="flex  items-center justify-center gap-2 bg-accent  text-accent2  p-2  rounded-xl "
            >
              <Pen size={20} />
            </button>
            <button
              // onClick={() => DelTask(del, setDel, task_id)}
              onClick={openModal}
              className="flex  items-center justify-center gap-2 bg-accent  text-red-500  p-2  rounded-xl "
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      );
    case "redact":
      return <RedactCard setStarted={setIsStarted} task_id={task_id}></RedactCard>;
  }
}

function DelTask(del: string, setDel: (del: string) => void, task_id: string) {
  DelTaskService(task_id).then(() => {
    setDel(task_id);
  });
}

function startTask(task_id: string) {
  return StartTimeLogs(task_id);
}

function endTask(task_id: string) {
  EndTimeLogs(task_id);
}

export function convertTimeFormat(inputTime: string): string {
  // Парсим входное время
  const date = new Date(inputTime);

  // Получаем компоненты даты и времени
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Форматируем строку
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
