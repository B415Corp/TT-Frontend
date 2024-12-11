import { useParams } from "react-router-dom";

interface iTasks {}

export default function Tasks({}: iTasks) {
  let params = useParams();
  return <div className="text-white">Tasks{params.id }</div>;
}
