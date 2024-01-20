import React, { useLayoutEffect, useState } from "react";

const Confetti = ({ target, onstart, ondone }) => {
  const [confetiCount, setConfetiCount] = useState(0);
  const confetiLimit = 100;
  const confettiDestroyTime = 3000;
  const confettiRenderTime = 60;

  const setupElements = () => {
    const containerDOM = document.createElement("div");
    const targetPosition = target.style.position;

    containerDOM.className = "confetti-container";

    if (targetPosition !== "relative" && targetPosition !== "absolute") {
      target.style.position = "relative";
    }

    target.appendChild(containerDOM);
  };

  const getContainerSize = () => {
    return Math.floor(Math.random() * 5) + 3 + "px"; // Adjust as needed
  };

  const getConfettiColor = () => {
    const confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    return confettiColors[Math.floor(Math.random() * confettiColors.length)];
  };

  const getConfettiSpeed = () => {
    const confettiSpeed = ["slow", "medium", "fast"];
    return confettiSpeed[Math.floor(Math.random() * confettiSpeed.length)];
  };

  const getConfettiPosition = () => {
    return Math.floor(Math.random() * target.offsetWidth) + "px";
  };

  const generateConfetti = () => {
    const confettiDOM = document.createElement("div");
    const confettiSize = getContainerSize();
    const confettiBackground = getConfettiColor();
    const confettiLeft = getConfettiPosition();
    const confettiSpeed = getConfettiSpeed();

    confettiDOM.classList.add("confetti");
    confettiDOM.classList.add("confetti-animation-" + confettiSpeed);
    confettiDOM.style.left = confettiLeft;
    confettiDOM.style.width = confettiSize;
    confettiDOM.style.height = confettiSize;
    confettiDOM.style.backgroundColor = confettiBackground;

    confettiDOM.removeTimeout = setTimeout(() => {
      confettiDOM.parentNode.removeChild(confettiDOM);
    }, confettiDestroyTime);

    target.appendChild(confettiDOM);
  };

  const renderConfetti = () => {
    if (onstart) {
      onstart();
    }

    const confettiInterval = setInterval(() => {
      setConfetiCount((prevCount) => prevCount + 1);

      if (confetiCount > confetiLimit) {
        if (ondone) {
          ondone();
        }
        clearInterval(confettiInterval);
        return;
      } else {
        generateConfetti();
      }
    }, confettiRenderTime);
  };

  const restart = () => {
    setConfetiCount(0);
    renderConfetti();
  };

  const start = restart;

  const stop = () => {
    setConfetiCount(confetiLimit);
  };

  useLayoutEffect(() => {
    if (target) {
      setupElements();
      renderConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return null; // Adjust the return value based on your component's requirements
};

export default Confetti;
