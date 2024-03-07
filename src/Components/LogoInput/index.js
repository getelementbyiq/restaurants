import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import { Box } from "@mui/material";

const FileInputLogo = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Wenn eine Datei ausgewählt wurde
      dispatch(setRestaurantField({ field: "logo", value: file }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        border: "1px solid rgba(0,0,0,0.2)",
        height: "40px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "40px",
      }}
    >
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={handleFileSelect}
        style={{ display: "none", cursor: "pointer" }}
        id="fileInputLogo"
      />
      <label htmlFor="fileInputLogo">
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.3)" }}>Select your Logo</p>
        )}
      </label>
    </Box>
  );
};

export default FileInputLogo;
