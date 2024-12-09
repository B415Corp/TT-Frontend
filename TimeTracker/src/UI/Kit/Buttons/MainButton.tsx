interface iMainButton {
  children?: React.ReactNode;
}

export default function MainButton({ children }: iMainButton) {
  return (
    <>
      <button className="flex items-center justify-center gap-2 bg-primary  text-text  py-4 px-6 rounded-xl hover:scale-105 duration-500">
        {children}
      </button>
    </>
  );
}
