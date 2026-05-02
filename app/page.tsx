"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Lost } from "./_components/Lost";
import { Playing } from "./_components/Playing";
import { Selecting } from "./_components/Selecting";
import { Won } from "./_components/Won";

export default function Home() {
  const [target, setTarget] = useState<number | null>(null);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState<
    "selecting" | "playing" | "won" | "lost"
  >("selecting");
  const [shakingButton, setShakingButton] = useState<number | null>(null);

  const selectTarget = (n: number) => {
    setTarget(n);
    const nums = Array.from({ length: n + 1 }, (_, i) => i);
    // Shuffle
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
    setCurrentIndex(0);
    setTimeLeft(10);
    setGameState("playing");
  };

  const handleClick = (x: number) => {
    if (x === target! - numbers[currentIndex]) {
      if (currentIndex + 1 === numbers.length) {
        setGameState("won");
        confetti({
          particleCount: 500,
          spread: 180,
          startVelocity: 60,
          origin: { y: 0.6 },
          ticks: 2000,
        });
      } else {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(10);
      }
    } else {
      setShakingButton(x);
      setTimeout(() => setShakingButton(null), 500);
    }
  };

  const resetGame = () => {
    setTarget(null);
    setNumbers([]);
    setCurrentIndex(0);
    setTimeLeft(10);
    setGameState("selecting");
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        if (timeLeft === 1) {
          setGameState("lost");
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameState]);

  if (gameState === "selecting") {
    return <Selecting onSelectTarget={selectTarget} />;
  } else if (gameState === "won") {
    return <Won onPlayAgain={resetGame} />;
  } else if (gameState === "lost") {
    return <Lost onTryAgain={resetGame} />;
  } else {
    return (
      <Playing
        target={target!}
        currentNumber={numbers[currentIndex]}
        timeLeft={timeLeft}
        shakingButton={shakingButton}
        onClickButton={handleClick}
      />
    );
  }
}
