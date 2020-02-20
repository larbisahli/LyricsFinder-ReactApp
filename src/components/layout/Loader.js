import React from "react";
import "./Loader.scss";

const letters = ["L", "o", "a", "d", "i", "n", "g"];

const Loader = () => {
  return (
    <div className="loading_container">
      <div className="loading">
        {letters.map((letter, i) => {
          return (
            <span key={i} style={{ animationDelay: `${i / 5}s` }}>
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Loader;
