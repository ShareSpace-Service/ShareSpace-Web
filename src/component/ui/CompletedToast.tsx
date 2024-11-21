import CheckCircleIcon from '@/assets/check-circle.svg';

function CompletedToast({
  isVisible,
  message,
}: {
  isVisible: boolean;
  message: string;
}): JSX.Element {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
      <div
        className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white
          border border-emerald-700 shadow-xl rounded-b-lg rounded-t-none px-6 py-4 mt-0 max-w-md
          transform transition-all duration-500 ease-in-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
          }`}
        style={{
          pointerEvents: 'none',
        }}
      >
        <div className="flex items-center space-x-3">
          <img src={CheckCircleIcon} className="h-8 w-8" alt="check circle" />
          <p className="text-sm font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default CompletedToast;
