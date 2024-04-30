import { useState, useEffect } from "react";

function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Beispielgrenze für mobile Geräte, kann angepasst werden
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}

export default useMobileCheck;
