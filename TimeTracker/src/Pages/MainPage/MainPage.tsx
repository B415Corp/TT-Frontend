import { useEffect, useState } from "react";
import { GetUser } from "../../Features/User/UserServises";
import { ArrowRight } from "lucide-react";


interface IUser {
  user_id: string;
  name: string;
  email: string;
  subscriptionType: string;
}

function MainPage() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    GetUser().then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <div className="flex flex-col bg-header mt-8 mx-20 rounded-xl p-8">
      <div className="flex flex-col w-full h-full gap-6">
        <div className="flex items-center justify-center gap-2 text-white text-5xl">
          Доброго дня, {user?.name}
        </div>
        <div className="flex flex-row w-full items-start justify-start gap-2 text-white text-xl">
          <div className="flex w-3/4 items-center justify-center gap-2"></div>
          <div className="flex flex-col w-1/4 items-start justify-center gap-3">
            <div className="text-xs text-accent2">Премиум функционал</div>
            <div className="text-3xl text-white">
              Не упусти свой шанс попробовать новый функционал
            </div>
            <div>
              Ваша подписка:{" "}
              <span className="text-accent2">{user?.subscriptionType}</span>
            </div>
            <button className="flex items-center justify-center gap-2 bg-primary text-2xl  text-white  py-2 px-3 rounded-xl hover:scale-105 duration-500 gap-6">
              Обновить план<ArrowRight />{" "}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MainPage;
