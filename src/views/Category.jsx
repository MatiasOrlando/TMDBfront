import React from "react";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
const Category = () => {
  const { categoryId } = useParams();
  return (
    <>
      <SearchBar />
      <MoviesContainer categoryId={categoryId} />;
      <Toaster />
    </>
  );
};

export default Category;
