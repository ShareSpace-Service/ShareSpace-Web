interface LoginTitleProps {
  title: string;
  subTitle: string;
}
function LoginTitle({ title, subTitle }: LoginTitleProps) {
  return (
    <div className="flex flex-col gap-3 items-start pt-10 pl-[28px]">
      <h1 className="font-extrabold text-5xl tracking-wider text-fontColor">
        {title}
      </h1>
      <p className="font-bold text-base">{subTitle}</p>
    </div>
  );
}

export default LoginTitle;
