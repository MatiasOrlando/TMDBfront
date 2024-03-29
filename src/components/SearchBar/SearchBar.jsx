import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import SearchIcon from "@mui/icons-material/Search";
import { contexto } from "../../Context/Context";

const SearchBar = () => {
  const { setSearchTerm, searchTerm, handleSubmit } = useContext(contexto);
  const [showClearIcon, setShowClearIcon] = useState(false);

  const handleClearInput = () => {
    setSearchTerm("");
    setShowClearIcon(false);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowClearIcon(e.target.value.trim() !== "");
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: 300, sm: 320, md: 440, lg: 640 },
      }}
      onSubmit={handleSubmit}
      name="search"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a movie, tv show..."
        onChange={handleChange}
        value={searchTerm}
        // required
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      {showClearIcon && (
        <IconButton onClick={() => handleClearInput()}>
          <HighlightOffSharpIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchBar;
