import confetti from "canvas-confetti";

export const fireWinConfetti = () => {
  const trophyShape = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "🏆", scalar: 2 })
    : "circle";

  const starShape = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "⭐", scalar: 2 })
    : "circle";

  const colors = [
    "#ff004c",
    "#ff7a00",
    "#ffd400",
    "#22c55e",
    "#00c2ff",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  confetti({
    particleCount: 100,
    spread: 75,
    startVelocity: 48,
    origin: { x: 0.5, y: 0.7 },
    scalar: 1.1,
    colors,
  });

  confetti({
    particleCount: 45,
    spread: 100,
    startVelocity: 38,
    origin: { x: 0.25, y: 0.75 },
    shapes: [trophyShape],
    scalar: 1.6,
    colors,
  });

  confetti({
    particleCount: 45,
    spread: 100,
    startVelocity: 38,
    origin: { x: 0.75, y: 0.75 },
    shapes: [starShape],
    scalar: 1.5,
    colors,
  });
};

export const fireFailConfetti = () => {
  const dislikeShape = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "👎", scalar: 2 })
    : "circle";

  const sadShape = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "😬", scalar: 2 })
    : "circle";

  const colors = [
    "#111111",
    "#2a2a2a",
    "#444444",
    "#666666",
    "#888888",
    "#aaaaaa",
  ];

  confetti({
    particleCount: 55,
    spread: 55,
    startVelocity: 24,
    origin: { x: 0.5, y: 0.7 },
    scalar: 0.9,
    colors,
  });

  confetti({
    particleCount: 28,
    spread: 70,
    startVelocity: 22,
    origin: { x: 0.38, y: 0.75 },
    shapes: [dislikeShape],
    scalar: 1.4,
    colors,
  });

  confetti({
    particleCount: 28,
    spread: 70,
    startVelocity: 22,
    origin: { x: 0.62, y: 0.75 },
    shapes: [sadShape],
    scalar: 1.3,
    colors,
  });
};