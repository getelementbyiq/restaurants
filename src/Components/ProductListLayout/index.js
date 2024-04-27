import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

const MasonryGrid = ({ children }) => {
  const [columns, setColumns] = useState(3); // Anzahl der Spalten

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setColumns(3);
      } else if (window.innerWidth >= 960) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialisierung

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Überprüfe, ob children definiert ist
  if (!children || !Array.isArray(children)) {
    return null;
  }

  return <Box></Box>;
};

export default MasonryGrid;
