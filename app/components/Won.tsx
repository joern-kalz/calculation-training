interface WonProps {
    onPlayAgain: () => void;
}

export function Won({ onPlayAgain }: WonProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
            <h1 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">🎉 Congratulations! You Won! 🎉</h1>
            <button
                onClick={onPlayAgain}
                className="px-10 py-5 bg-yellow-400 text-purple-800 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-110 transition-all duration-200 shadow-lg text-2xl"
            >
                Play Again
            </button>
        </div>
    );
}
