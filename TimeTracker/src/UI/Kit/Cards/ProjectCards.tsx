import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    // <div
    //   onClick={() => navigate(`/projects/${project_id}`)}
    //   className="flex w-1/4 flex-row  text-white border-b py-1  hover:bg-primary"
    // >
    //   <span className="w-3/4 pl-44">{name}</span>
    //   <div className="flex flex-row justify-around w-full ">
    //     <span className="max-w-32 overflow-hidden">{created_at}</span>
    //     <span className="max-w-32 overflow-hidden">Общее время</span>
    //     <span className="max-w-32 overflow-hidden">Владелец</span>
    //   </div>
    // </div>
    <div className="flex flex-row w-[32rem] h-32 bg-accent rounded-xl" onClick={() => navigate(`/projects/${project_id}`)}>
      <div className="flex flex-col w-2/4 pl-4 pt-2 gap-1">
        <span className="text-white text-lg">{name}</span>
        <div className="text-accent2 text-xs flex flex-row gap-1 ">
          <CalendarDays size={16} strokeWidth={1} />
          <span>Создано </span>
          {created_at}
        </div>
      </div>
      <div className="flex flex-col w-2/4"></div>
    </div>
  );
}
