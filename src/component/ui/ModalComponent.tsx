function ModalComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[300px] p-6 rounded-lg relative">
        <div className="flex flex-col h-full justify-around">{children}</div>
      </div>
    </div>
  );
}

export default ModalComponent;
