interface SelectingProps {
  onSelectTarget: (target: number) => void;
  timeoutDuration: number;
  onTimeoutChange: (value: number) => void;
}

export function Selecting({
  onSelectTarget,
  timeoutDuration,
  onTimeoutChange,
}: SelectingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">
        Calculation Training Game
      </h1>
      <p className="text-xl mb-6 text-white">Select a target number:</p>
      <div className="grid grid-cols-4 gap-3 max-w-md">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onSelectTarget(n)}
            className="px-10 py-5 bg-yellow-400 text-purple-800 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-110 transition-all duration-200 shadow-lg text-xl"
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-8 text-white text-center">
        <label className="block mb-2 text-xl">
          Timeout per round: {timeoutDuration}s
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={timeoutDuration}
          onChange={(e) => onTimeoutChange(Number(e.target.value))}
          className="w-80"
        />
      </div>
    </div>
  );
}
