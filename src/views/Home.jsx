import React from "react";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import SearchBar from "../components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <SearchBar />
      </Box>
      <MoviesContainer />
      <Toaster />
    </>
  );
};

export default Home;
