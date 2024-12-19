interface PageTitleProps {
  title: string;
  description?: string;
}

function PageTitle({ title, description }: PageTitleProps) {
  const descriptions: { [key: string]: string } = {
    장소수정: '등록된 장소의 정보를 수정할 수 있습니다.',
    이용내역: '지금까지 이용한 장소들을 확인할 수 있습니다.',
    문의하기: '궁금한 점이나 건의사항을 작성해 주세요.',
    마이페이지: '회원님의 정보를 확인하고 관리할 수 있습니다.',
  };

  return (
    <div className="w-full pb-5">
      <h2 className="font-extrabold text-2xl text-fontColor">{title}</h2>
      <p className="text-sm font-bold text-gray-600 mt-1">
        {description || descriptions[title]}
      </p>
    </div>
  );
}

export default PageTitle;
