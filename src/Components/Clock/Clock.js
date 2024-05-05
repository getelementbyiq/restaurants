import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 1000); // Aktualisierung alle 1 Sekunde

    return () => clearInterval(interval); // Aufräumen beim Entfernen der Komponente
  }, []);

  return currentTime;
};

export default Clock;
