import { useEffect, useRef, useState } from "react";
import "../styles/signalcard.css";

import beepSound from "../assets/audio/beep.mp3";
import hha from "../assets/audio/hhaa.mp3";
import ffaa from "../assets/audio/ffaa.mp3";
import wow from "../assets/audio/wow.mp3";
import f1pov from "../assets/f1pov.png";

import { fireFailConfetti, fireWinConfetti } from "../utils/confettiEffects";

export default function SignalCard() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [gameState, setGameState] = useState("idle");
  const [time, setTime] = useState(0);
  const [scores, setScores] = useState([]);

  const beepRef = useRef(new Audio(beepSound));
  const hhaRef = useRef(new Audio(hha));
  const ffaaRef = useRef(new Audio(ffaa));
  const wowRef = useRef(new Audio(wow));

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(0);

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(3, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(3, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const playFailAudio = () => {
    const failSounds = [hhaRef.current, ffaaRef.current];
    const randomSound = failSounds[Math.floor(Math.random() * failSounds.length)];
    playAudio(randomSound);
  };

  const handleStart = () => {
    clearTimers();

    setActiveIndex(-1);
    setTime(0);
    setGameState("loading");

    let index = -1;

    intervalRef.current = setInterval(() => {
      index += 1;
      setActiveIndex(index);
      playAudio(beepRef.current);

      if (index >= 4) {
        clearInterval(intervalRef.current);

        const randomDelay = 1000 + Math.random() * 2000;

        timeoutRef.current = setTimeout(() => {
          setActiveIndex(-1);
          playAudio(beepRef.current);
          setGameState("running");

          startTimeRef.current = Date.now();

          intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current);
          }, 10);
        }, randomDelay);
      }
    }, 1000);
  };

  const handleStop = () => {
    if (gameState === "loading") {
      clearTimers();
      setActiveIndex(-1);
      setTime(0);
      setGameState("idle");
      playFailAudio();
      fireFailConfetti();
      return;
    }

    if (gameState !== "running") return;

    clearInterval(intervalRef.current);

    const finalTime = Date.now() - startTimeRef.current;
    setTime(finalTime);

    setScores((prevScores) => {
      const lowestScore = prevScores.length > 0 ? Math.min(...prevScores) : null;
      const isNewBest = lowestScore === null || finalTime < lowestScore;

      if (isNewBest) {
        playAudio(wowRef.current);
        fireWinConfetti();
      }

      return [...prevScores, finalTime];
    });

    setGameState("stopped");
  };

  const handleButtonClick = () => {
    if (gameState === "idle" || gameState === "stopped") {
      handleStart();
    } else {
      handleStop();
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const highestScore = scores.length ? Math.min(...scores) : null;

  return (
    <div className="card-container">
      <div
        className="signal-card"
        style={{ backgroundImage: `url(${f1pov})` }}
      >
        <div className="instruction-box">
          <h2 className="heading">TEST YOUR REACTION SPEED</h2>
          <hr/>
          <p>
            Press Start, wait until the red lights disappear, then press Stop as
            fast as possible.
          </p>
        </div>

        <div className="signal-strip">
          {[0, 1, 2, 3, 4].map((index) => (
            <div className="signal-unit" key={index}>
              <span
                className={`signal-light ${
                  index <= activeIndex ? "red" : "dark"
                }`}
              />
              <span
                className={`signal-light ${
                  index <= activeIndex ? "red" : "dark"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="timer">{formatTime(time)}</div>

        <button className="control-button" onClick={handleButtonClick}>
          {gameState === "idle" || gameState === "stopped" ? "Start" : "Stop"}
        </button>

        <div className="score-box">
          <p>Highest Score</p>
          <strong>
            {highestScore === null ? "000:000:000" : formatTime(highestScore)}
          </strong>
        </div>

        {scores.length > 0 && (
          <div className="score-list">
            {scores.map((score, index) => (
              <span key={index}>{formatTime(score)}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}