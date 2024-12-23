import { CirclePause, CirclePlay, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DelTaskService } from "../../../Features/Task/TaskServices";
import { formatTime } from "../../../Features/Time_log/StopWatch";
import {
  EndTimeLogs,
  GetTimeLogsAll,
  StartTimeLogs,
} from "../../../Features/Time_log/TimeLogServises";
import Modal from "../PopUps/ProjectPopUp";
import { set } from "react-hook-form";

interface iProjectCards {
  project_id: string;
  name: string;
  // client_id: string;
  // user_ids: string[];
  // user_owner_id: string;
  created_at: string;
  // updated_at: string;
  del: number;
  setDel: (del: number) => void;
  task_id: string;
}

export default function TaskCards({
  name,
  created_at,
  project_id,
  del,
  setDel,
  task_id,
}: iProjectCards) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    GetTimeLogsAll(task_id).then((res) => {
      console.log(res.data[0].status);
      if (res.data[0].status == "in-progress") {
        setIsActive(true);
        setIsStarted(true);
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
        console.log(time);
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

  if (!isStarted) {
    return (
      <div className="flex flex-row items-center  text-white border-b  px-4 gap-4  hover:bg-primary">
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
        <button
          onClick={() => {
            startTask(task_id), setIsStarted(true), setIsActive(true);
          }}
        >
          <CirclePlay
            size={50}
            className="text-emerald-400"
            strokeWidth={"1"}
          />
        </button>
        <span style={{ lineHeight: "unset" }}>{formatTime(time)}</span>
        <span className="w-2/4 pl-44">{name}</span>
        <div className="flex flex-row justify-around w-full ">
          <span className="flex  max-w-32 overflow-hidden">{created_at}</span>
          <button
            // onClick={() => DelTask(del, setDel, task_id)}
            onClick={openModal}
            className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-0.5  rounded-xl my-4 mx-4"
          >
            <CircleX />
            Удалить
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center  text-white border-b  px-4 gap-4  hover:bg-primary">
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
        <button
          onClick={() => {
            endTask(task_id), setIsStarted(false), setIsActive(false);
          }}
        >
          <CirclePause size={50} className="text-red-400" strokeWidth={"1"} />
        </button>
        <span style={{ lineHeight: "unset" }}>{formatTime(time)}</span>
        <span className="w-2/4 pl-44">{name}</span>
        <div className="flex flex-row justify-around w-full ">
          <span className="flex  max-w-32 overflow-hidden">{created_at}</span>
          <button
            // onClick={() => DelTask(del, setDel, task_id)}
            onClick={openModal}
            className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-0.5  rounded-xl my-4 mx-4"
          >
            <CircleX />
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

function DelTask(del: number, setDel: (del: number) => void, task_id: string) {
  DelTaskService(task_id).then(() => setDel(del + 1));
}

function startTask(task_id: string) {
  StartTimeLogs(task_id);
}

function endTask(task_id: string) {
  EndTimeLogs(task_id);
}
