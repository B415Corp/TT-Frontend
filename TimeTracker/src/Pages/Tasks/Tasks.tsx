import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronRight,
  CircleX,
  LayoutDashboard,
  Plus,
  TableOfContents,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DelProjectService } from "../../Features/Project/ProjectServices";
import { GetTasks } from "../../Features/Task/TaskServices";
import TaskCards from "../../UI/Kit/Cards/TaskCards";
import Modal from "../../UI/Kit/PopUps/ProjectPopUp";
import NewTaskForm from "./NewTaskForm";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);
  const [del, setDel] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchTasks();
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
      console.log(data);
      setTasks(data.data);
      setTotalPages(data.meta.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [pages, del]);
  if (!tasks) return <div>No projects found</div>;

  return (
    <div className="text-white flex flex-col">
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
      <div className="flex flex-row pt-4 px-4">
        <div className="flex flex-row w-full  text-xl items-center gap-4 ">
          Проекты <ChevronRight />
          project name
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-full">
            <button className="flex items-center justify-center gap-2 bg-primary  text-white  py-2 px-6 rounded-xl ">
              <TableOfContents />
              Список
            </button>
          </div>
          <div className="flex flex-row w-full">
            <button className="flex items-center justify-center gap-2 bg-primary  text-white  py-2 px-6 rounded-xl ">
              <LayoutDashboard />
              Доска
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-4 ">
        <div className="flex flex-row justify-between w-full ">
          <button
            onClick={openModal}
            className="flex w-1/6 items-center justify-center gap-2 bg-primary  text-white  py-2  rounded-xl my-4 mx-4"
          >
            <Plus />
            Создать новую задачу
          </button>
          <button
            onClick={openModal2}
            className="flex w-1/6 items-center justify-center gap-2 bg-accent2  text-white  py-2  rounded-xl my-4 mx-4"
          >
            <CircleX />
            Удалить Проект
          </button>
        </div>

        {tasks.map((project: Task, index) => (
          <TaskCards
            key={index}
            name={project.name}
            created_at={project.created_at}
            project_id={project.project_id}
            del={del}
            setDel={setDel}
            task_id={project.task_id}
          ></TaskCards>
        ))}
      </div>
      <div className="flex flex-row justify-center  h-8 m-4 pr-10 gap-10">
        <div className="flex flex-row justify-center w-full h-8 m-4 pr-10 gap-10">
          <button
            onClick={() => {
              if (pages <= 1) {
                setPages(1);
              } else {
                setPages(pages - 1);
              }
            }}
            className="flex items-center justify-center gap-2 bg-primary  text-white  py-4 px-6 rounded-xl hover:scale-105 duration-500"
          >
            <ArrowBigLeft />
          </button>
          {
            <span className="text-white flex flex-row items-center">
              {pages}
            </span>
          }
          <button
            onClick={() => {
              if (pages >= totalPages) {
                setPages(totalPages);
              } else {
                setPages(pages + 1);
              }
            }}
            className="flex items-center justify-center gap-2 bg-primary  text-white  py-4 px-6 rounded-xl hover:scale-105 duration-500"
          >
            <ArrowBigRight />
          </button>
        </div>
      </div>
    </div>
  );
}
