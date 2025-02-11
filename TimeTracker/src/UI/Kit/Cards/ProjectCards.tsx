import { CalendarDays, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertTimeFormat } from "./TaskCards";

interface iProjectCards {
  project_id: string;
  name: string;
  // client_id: string;
  // user_ids: string[];
  // user_owner_id: string;
  created_at: string;
  // updated_at: string;
}

export default function ProjectCards({
  name,
  created_at,
  project_id,
}: iProjectCards) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row w-[32rem] h-32 bg-accent rounded-xl"
      onClick={() => navigate(`/projects/${project_id}`)}
    >
      <div className="flex w-full flex-col pl-4 pt-2 gap-1">
        <div className="flex  flex-row justify-between">
          <span className="text-white text-lg">{name}</span>{" "}
          <button
            // onClick={() => DelTask(del, setDel, task_id)}
            onClick={() => {}}
            className="flex  items-center justify-center gap-2 bg-accent2  text-accent mx-2  p-2  rounded-xl "
          >
            <Pen size={20} />
          </button>
        </div>

        <div className="text-accent2 text-xs flex flex-row gap-1 ">
          <CalendarDays size={16} strokeWidth={1} />
          <span>Создано </span>
          {convertTimeFormat(created_at)}
        </div>
      </div>
    </div>
  );
}
