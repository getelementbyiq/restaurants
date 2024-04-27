import React, { useState, useEffect } from "react";

const BlinkingCursor = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevIsVisible) => !prevIsVisible);
    }, 500); // Ändere die Blinkgeschwindigkeit nach Bedarf

    return () => clearInterval(interval);
  }, []);

  return <span style={{ color: "#ffffff" }}>{isVisible ? "|" : " "}</span>;
};

export default BlinkingCursor;
