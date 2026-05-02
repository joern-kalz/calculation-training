const styles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  .shake {
    animation: shake 0.5s ease-in-out;
  }
`;

interface PlayingProps {
    target: number;
    currentNumber: number;
    timeLeft: number;
    shakingButton: number | null;
    onClickButton: (number: number) => void;
}

export function Playing({
    target,
    currentNumber,
    timeLeft,
    shakingButton,
    onClickButton,
}: PlayingProps) {
    return (
        <>
            <style>{styles}</style>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
                <div className="text-5xl mb-6 text-white font-bold drop-shadow-lg">
                    {currentNumber} + ? = {target}
                </div>
                <div className="w-full max-w-md mb-6">
                    <div className="bg-white rounded-full h-4 overflow-hidden shadow-lg">
                        <div
                            className="bg-gradient-to-r from-green-400 to-red-500 h-full transition-all duration-1000 ease-linear"
                            style={{ width: `${(timeLeft / 10) * 100}%` }}
                        ></div>
                    </div>
                    <div className="text-center text-white mt-2">Time: {timeLeft}s</div>
                </div>
                <div className="flex flex-wrap gap-3 mb-8 justify-center max-w-2xl">
                    {Array.from({ length: target + 1 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onClickButton(i)}
                            className={`px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:from-cyan-300 hover:to-blue-400 transform hover:scale-110 transition-all duration-200 shadow-lg min-w-[80px] text-xl ${shakingButton === i ? 'shake' : ''}`}
                        >
                            {i}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
