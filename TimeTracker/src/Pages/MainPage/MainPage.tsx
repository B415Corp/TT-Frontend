import { Apple } from "lucide-react";
import MainButton from "../../UI/Kit/Buttons/MainButton";

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen">
      <h1>This is Main Page</h1>
      <MainButton>
        <Apple strokeWidth={1.2}/>
        Main Button
      </MainButton>
    </div>
  );
}

export default MainPage;
