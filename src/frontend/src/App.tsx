import { useEffect, useRef, useState } from "react";

const questions = [
  "Do you love me? 🐱",
  "Are you suuure? 🥺",
  "Maybe just a little? 😢",
  "But look how cute I am! 🐾",
  "Pretty pleaseee? 💝",
  "Last chance... do you love me? 🌹",
  "Click YES and make my day! ❤️",
];

const heartEmojis = ["❤️", "💕", "🌹", "💗", "💖", "🌸"];

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

function useFloatingHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: heartEmojis[i % heartEmojis.length],
    left: (i * 11 + 3) % 97,
    size: 20 + ((i * 7) % 20),
    duration: 6 + ((i * 1.3) % 6),
    delay: (i * 0.9) % 8,
  }));
}

export default function App() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [showYes, setShowYes] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [celebrationHearts, setCelebrationHearts] = useState<FloatingHeart[]>(
    [],
  );
  const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgHearts = useFloatingHearts(10);

  const handleNo = () => {
    setQuestionIdx((prev) => (prev + 1) % questions.length);
    setShaking(true);
    if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    shakeTimeout.current = setTimeout(() => setShaking(false), 600);
  };

  const handleYes = () => {
    const hearts: FloatingHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
      left: Math.round((i * 3.33 + 1) % 97),
      size: 20 + Math.round((i * 1.03) % 30),
      duration: 4 + Math.round((i * 0.3) % 4),
      delay: Math.round(((i * 0.2) % 3) * 10) / 10,
    }));
    setCelebrationHearts(hearts);
    setShowYes(true);
  };

  useEffect(() => {
    return () => {
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    };
  }, []);

  return (
    <div className="app-root">
      <div className="bg-layer" />
      <div className="overlay-layer" />

      <div className="ambient-hearts" aria-hidden="true">
        {bgHearts.map((h) => (
          <span
            key={h.id}
            className="ambient-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {showYes ? (
        <div className="yes-screen">
          <div className="celebration-hearts" aria-hidden="true">
            {celebrationHearts.map((h) => (
              <span
                key={h.id}
                className="celebration-heart"
                style={{
                  left: `${h.left}%`,
                  fontSize: `${h.size}px`,
                  animationDuration: `${h.duration}s`,
                  animationDelay: `${h.delay}s`,
                }}
              >
                {h.emoji}
              </span>
            ))}
          </div>

          <div className="yes-card">
            <h1 className="yes-title">YAAAY! I love you too! 💗🌹</h1>
            <p className="yes-subtitle">You just made everything perfect ✨</p>
            <img
              src="https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif"
              alt="Romantic celebration"
              className="yes-gif"
            />
          </div>
        </div>
      ) : (
        <div className="main-card">
          <h1 className="question-text">{questions[questionIdx]}</h1>

          <div className="gif-wrapper">
            <img
              src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
              alt="Cute cat"
              className={`cat-gif${shaking ? " shaking" : ""}`}
            />
          </div>

          <div className="buttons">
            <button
              type="button"
              className="btn btn-yes"
              onClick={handleYes}
              data-ocid="yes.primary_button"
            >
              Yes 💕
            </button>
            <button
              type="button"
              className="btn btn-no"
              onClick={handleNo}
              data-ocid="no.secondary_button"
            >
              No 😅
            </button>
          </div>
        </div>
      )}

      <footer className="app-footer">
        © {new Date().getFullYear()}. Built with{" "}
        <span className="heart-icon">❤️</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
