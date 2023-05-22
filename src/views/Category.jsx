import React from "react";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import AppPagination from "../components/AppPagination/AppPagination";

const Category = () => {
  const { categoryId } = useParams();
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
      <MoviesContainer categoryId={categoryId} />;
      <AppPagination />
      <Toaster />
    </>
  );
};

export default Category;
