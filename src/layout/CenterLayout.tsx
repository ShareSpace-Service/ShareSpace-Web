function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between h-screen w-full">
      {children}
    </div>
  );
}

export default CenteredLayout;
