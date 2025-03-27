import {
  LoaderCircle,
  Pen,
  Plus,
  RefreshCcw,
  Settings,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DelProjectService,
  GetProjectsByID,
} from "../../Features/Project/ProjectServices";
import { GetTasks } from "../../Features/Task/TaskServices";
import TaskCards from "../../UI/Kit/Cards/TaskCards";
import Modal from "../../UI/Kit/PopUps/ProjectPopUp";
import NewTaskForm from "./NewTaskForm";
import { set } from "react-hook-form";

interface iTasks {}

interface Task {
  task_id: string;
  name: string;
  project_id: string;
  user_id: string;
  description: string;
  is_paid: boolean;
  payment_type: string;
  rate: number;
  created_at: string;
  updated_at: string;
}

export default function Tasks({}: iTasks) {
  let params = useParams();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [oldtasks, setOldTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);
  const [del, setDel] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setprojectName] = useState<string>("projectName");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    GetTasks(1, params.id as string).then((res) => {
      if (tasks) {
        setTasks([res.data[0], ...tasks]);
      }
    });
  };

  let navigate = useNavigate();
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => {
    setIsModalOpen2(false);
    fetchTasks();
  };

  async function fetchTasks() {
    try {
      const data = await GetTasks(pages, params.id as string);
      if (pages > 1) {
        if (tasks) {
          setTasks([...tasks, ...data.data]);
        }
      } else {
        setTasks(data.data);
      }

      setTotalPages(data.meta.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setLoading(false);
    }
  }

  useEffect(() => {
    GetProjectsByID(params.id as string).then((res) => {
      setprojectName(res.data.name);
      fetchTasks();
    });
  }, []);

  useEffect(() => {
    tasks?.forEach((task, index) => {
      if (task.task_id == del) {
        tasks.splice(index, 1);
        setDel("");
      }
    });
  }, [del]);

  useEffect(() => {
    fetchTasks();
  }, [pages]);

  if (loading)
    return (
      <div className="flex h-screen w-full justify-center items-center text-white rota">
        <div className="flex justify-center items-center animate-spin">
          <LoaderCircle size={164} />
        </div>
      </div>
    );
  if (!tasks) return <div>No projects found</div>;

  return (
    <div className="flex flex-col bg-header my-8 mx-20 rounded-xl p-8 ">
      <Modal isOpen={isModalOpen} close={closeModal}>
        <NewTaskForm close={closeModal} id={params.id as string}></NewTaskForm>
      </Modal>
      <Modal isOpen={isModalOpen2} close={closeModal2}>
        <div className="flex flex-col">
          Вы действительно хотите удалить проект?
          <div className="flex flex-row gap-8">
            <button
              onClick={() => {
                DelProjectService(params.id as string);
                closeModal2();
                navigate("/projects");
              }}
              className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
            >
              Да
            </button>
            <button
              // onClick={() => DelTask(del, setDel, task_id)}
              onClick={() => closeModal2()}
              className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
            >
              Нет
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <div className="flex flex-row w-full text-white text-xl items-center gap-4 ">
            {projectName}
          </div>
          <span className="text-sm text-accent2">
            Показано {"3"} из {"12"} задач
          </span>
        </div>
        <div className="flex flex-row">
          <button
            onClick={openModal2}
            className="flex w-12 h-12   items-center justify-center gap-2 bg-accent   text-accent2  p-2  rounded-xl m-2"
          >
            <Settings size={26} />
          </button>
          <button
            onClick={openModal}
            className="flex w-12 h-12 items-center justify-center gap-2 bg-accent  text-accent2  p-2  rounded-xl my-2 mx-2"
          >
            <Pen size={26} />
          </button>
          <button
            onClick={openModal2}
            className="flex w-12 h-12   items-center justify-center gap-2 bg-accent  text-red-500  p-2  rounded-xl m-2"
          >
            <Trash2 size={26} />
          </button>
        </div>
      </div>

      <div className="flex flex-col pt-4 ">
        <div className="flex flex-row justify-between w-full ">
          <button
            onClick={openModal}
            className="flex  items-center justify-center gap-2 bg-primary  text-white  py-2 px-6 rounded-xl my-4 "
          >
            <Plus />
            Добавить задачу
          </button>
        </div>

        {tasks.map((project: Task) => (
          <TaskCards
            key={project.task_id}
            name={project.name}
            created_at={project.created_at}
            project_id={project.project_id}
            del={del}
            setDel={setDel}
            task_id={project.task_id}
            is_paid={project.is_paid}
          ></TaskCards>
        ))}
      </div>
      <div className="flex flex-row justify-center  h-8 m-4 pr-10 gap-10 ">
        <div className="flex flex-row justify-center w-full h-8 m-4 pr-10 gap-10">
          {pages < totalPages ? (
            <button
              onClick={() => {
                setPages(pages + 1);
              }}
              className="flex items-center justify-center gap-2 bg-primary  text-white  py-5 px-6 rounded-xl hover:scale-105  duration-500"
            >
              <div className="hover:animate-spin">
                <RefreshCcw />
              </div>
              Показать ещё
            </button>
          ) : (
            <span className="text-sm text-accent2">Заданий больше нет ...</span>
          )}
        </div>
      </div>
    </div>
  );
}
