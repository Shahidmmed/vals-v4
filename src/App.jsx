import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
// import ConfettiGenerator from "confetti-js"; // Commented out
import "highlight.js/styles/default.css";

const IJustCode = () => (
  <pre className="ijustcode">
    <code
      className="language-javascript"
      dangerouslySetInnerHTML={{
        __html:
          "&nbsp;&nbsp;ajax.call('/to', {{<br/>&nbsp;&nbsp;&nbsp;&nbsp;say: 'I love you!'<br/>&nbsp;&nbsp;}});",
      }}
    ></code>
  </pre>
);

const Heart = ({ children }) => (
  <div className="heart">
    <div className="heart-half">
      <div className="circle"></div>
      <div className="rect"></div>
    </div>
    {children}
  </div>
);

const Side = ({ id, children }) => (
  <div className={`side side-${id}`}>
    <div className="back">
      <Heart>
        <IJustCode />
        {children}
      </Heart>
    </div>
    <div className="front">
      <Heart>
        <IJustCode />
        {children}
      </Heart>
    </div>
  </div>
);

const Card = ({ id, onToggle }) => (
  <div className={`card card-${id}`} onClick={onToggle}>
    <Side id="a" />
    <Side id="b">
      <div className="title">Click me</div>
    </Side>
  </div>
);

const App = () => {
  const audioRef = useRef(null);

  const handleCardToggle = () => {
    const cardWrapper = document.querySelector(".card-wrapper");
    const gradient = document.querySelector("#gradient");

    if (cardWrapper) {
      const isActive = cardWrapper.classList.contains("active");

      if (isActive) {
        cardWrapper.classList.remove("active");
        if (audioRef.current) {
          audioRef.current.pause();
        }
        gradient.style.opacity = 0;
      } else {
        cardWrapper.classList.add("active");
        if (audioRef.current) {
          audioRef.current.play();
        }
        gradient.style.opacity = 1;
      }
    }
  };

  const FallingTextAnimation = () => {
    useEffect(() => {
      const p = document.querySelector(".falling-text");
      const text = p.textContent;
      const numberFalling = 6;

      p.innerHTML = "";
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        p.appendChild(span);
      }

      for (let i = 0; i < numberFalling; i++) {
        (function () {
          return setTimeout(function () {
            const el =
              p.children[Math.floor(Math.random() * p.children.length)];
            el.className = "falling";
            el.addEventListener("animationend", animateNext);
          }, i * (3000 / numberFalling));
        })();
      }

      function animateNext() {
        const notFalling = p.querySelectorAll(":not(.falling)");
        this.className = "";

        const newEl = notFalling[Math.floor(Math.random() * notFalling.length)];
        newEl.className = "falling";
        newEl.addEventListener("animationend", animateNext);
      }
    }, []);

    return <p className="falling-text">I'm Falling For Y❤U</p>;
  };

  useEffect(() => {
    hljs.highlightAll();

    const card = document.querySelector(".card-wrapper");
    const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
    const THRESHOLD = 30;

    function handleHover(e) {
      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight, offsetLeft, offsetTop } =
        currentTarget;

      const horizontal = (clientX - offsetLeft) / clientWidth;
      const vertical = (clientY - offsetTop) / clientHeight;
      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

      card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }

    function resetStyles(e) {
      card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }

    if (card && !motionMatchMedia.matches) {
      card.addEventListener("mousemove", handleHover);
      card.addEventListener("mouseleave", resetStyles);
    }

    /* new Granim({
      element: "#gradient",
      direction: "radial",
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ["#ff8faf", "#ffe5ed"],
            ["#f38fff", "#ffe5ed"],
            ["#ff8f8f", "#ffe5ed"],
          ],
        },
      },
    }); */
  }, []);

  return (
    <div
      style={{
        background: "radial-gradient(circle, #ff8f8f, #f38fff, #ff8faf)",
      }}
    >
      <div className="content">
        <FallingTextAnimation />
        <canvas id="gradient"></canvas>
        <div className="card-wrapper">
          <Card id="main" onToggle={handleCardToggle} />
        </div>
      </div>

      <audio
        controls
        ref={audioRef}
        src="https://toptrack-assets.s3.eu-central-1.amazonaws.com/i-just-called-comp.mp3"
        onClick={(e) => e.stopPropagation()}
      >
        {`Your browser does not support the <audio> element`}
      </audio>
    </div>
  );
};

export default App;
