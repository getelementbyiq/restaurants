import React, { useState } from "react";

const ToggleButtons = () => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (newAlignment) => {
    setAlignment(newAlignment);
  };
  console.log("now is:", alignment);

  return (
    <div>
      <div>
        <button
          onClick={() => handleAlignment("left")}
          className={alignment === "left" ? "active" : ""}
        >
          Left
        </button>
        <button
          onClick={() => handleAlignment("center")}
          className={alignment === "center" ? "active" : ""}
        >
          Center
        </button>
        <button
          onClick={() => handleAlignment("right")}
          className={alignment === "right" ? "active" : ""}
        >
          Right
        </button>
        <button
          onClick={() => handleAlignment("justify")}
          className={alignment === "justify" ? "active" : ""}
          disabled
        >
          Justify
        </button>
      </div>
    </div>
  );
};

export default ToggleButtons;
