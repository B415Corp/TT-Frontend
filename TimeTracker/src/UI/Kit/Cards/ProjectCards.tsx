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
    <div
      onClick={() => navigate(`/projects/${project_id}`)}
      className="flex flex-row  text-white border-b py-1  hover:bg-primary"
    >
      <span className="w-3/4 pl-44">{name}</span>
      <div className="flex flex-row justify-around w-full ">
        <span className="max-w-32 overflow-hidden">{created_at}</span>
        <span className="max-w-32 overflow-hidden">Общее время</span>
        <span className="max-w-32 overflow-hidden">Владелец</span>
      </div>
    </div>
  );
}
