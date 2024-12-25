import { ArrowBigLeft, ArrowBigRight, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { GetProjects } from "../../Features/Project/ProjectServices";
import ProjectCards from "../../UI/Kit/Cards/ProjectCards";
import Modal from "../../UI/Kit/PopUps/ProjectPopUp";
import NewProjectForm from "./NewProjectForm";

interface Project {
  project_id: string;
  name: string;
  client_id: string;
  user_ids: string[];
  user_owner_id: string;
  created_at: string;
  updated_at: string;
  total?: string;
}

interface Meta {
  total: string;
}

function ProjectPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [Metaprojects, setMetaProjects] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchProjects();
  };

  async function fetchProjects() {
    try {
      const data = await GetProjects(pages);
      console.log(data);
      setProjects(data.data);
      setMetaProjects(data.meta);
      setTotalPages(data.meta.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [isModalOpen, pages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!projects) return <div className="text-white">No projects found</div>;
  if (!Metaprojects) return <div className="text-white">No projects found</div>;

  return (
    <div className="flex flex-col bg-header mt-8 mx-20 rounded-xl ">
      <div className="flex flex-row justify-between h-8 m-4 pr-10">
        <Modal isOpen={isModalOpen} close={closeModal}>
          <NewProjectForm close={closeModal}></NewProjectForm>
        </Modal>

        <div className="flex flex-col ">
          <span className="text-2xl text-white">Проекты</span>
          <span className="text-sm text-accent2">
            Показано {projects.length} из {Metaprojects.total} проектов
          </span>
        </div>
        <button
          onClick={openModal}
          className="flex items-center justify-center gap-2 bg-primary  text-white  py-5 px-5 rounded-md "
        >
          <CirclePlus />
          Добавить проект
        </button>
      </div>

      <div className="flex flex-wrap gap-8 items-center justify-center  w-full pt-8  ">
        {projects.map((project: Project, index) => (
          <ProjectCards
            key={index}
            name={project.name}
            created_at={project.created_at}
            project_id={project.project_id}
          ></ProjectCards>
        ))}
      </div>
      <div className="flex flex-row justify-center  h-8 m-4 pr-10 gap-10">
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
        {<span className="text-white flex flex-row items-center">{pages}</span>}
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
  );
}

export default ProjectPage;
