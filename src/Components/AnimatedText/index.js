import React from "react";
import "./styles.css"; // Importiere das CSS

const AnimatedText = () => {
  return (
    <div style={{ height: "80px", overflow: "hidden" }}>
      <div className="string">
        <h1 className="greeting en">your taste</h1>
        <h1 className="greeting es">your lovely drinks</h1>
        <h1 className="greeting de">the right place for you</h1>
        <h1 className="greeting it">easy peasy</h1>
      </div>
    </div>
  );
};

export default AnimatedText;
