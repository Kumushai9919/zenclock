import React, { useEffect, useState } from "react";
import { formatTime } from "../utils/timeFormatter";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    //cleanup function is very important to avoid memory leaks
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <div className="text-8xl font-bold text-white mb-8">
        {formatTime(time)}
      </div>
      <div className="space-x-4">
        <button
          onClick={isRunning ? stopTimer : startTimer}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
