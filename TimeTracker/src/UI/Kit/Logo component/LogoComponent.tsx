import { ClockArrowUp } from "lucide-react";

interface iLogoComponent {}

export default function LogoComponent({}: iLogoComponent) {
  return (
    <div className="flex flex-row justify-start items-center font-bold  gap-2 text-white text-xl px-2 py-4">
      <ClockArrowUp size={46} />
      <span>
        Time <br />
        Traker
      </span>
    </div>
  );
}
