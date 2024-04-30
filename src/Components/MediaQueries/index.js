import { useState, useEffect } from "react";

function useDeviceType() {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 992) {
        setDeviceType("tablet");
      } else if (width >= 992 && width < 1200) {
        setDeviceType("desktop");
      } else {
        setDeviceType("eldesktop");
      }
    };

    checkDeviceType();

    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
