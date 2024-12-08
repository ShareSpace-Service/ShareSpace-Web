interface HeaderTitleProps {
  nickname?: string;
}

function HeaderTitle({ nickname = '호스트' }: HeaderTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-extrabold text-5xl text-fontColor">DashBoard</h2>
      <h3 className="text-base">
        <span className="font-bold text-xl">{nickname}</span>
        님의 공간 관리를 한눈에 확인하세요.
      </h3>
    </div>
  );
}

export default HeaderTitle;
