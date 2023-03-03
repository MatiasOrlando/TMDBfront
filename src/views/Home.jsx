import React from "react";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import SearchBar from "../components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
      <div>
        <SearchBar />
        <MoviesContainer />
      </div>
      <Toaster />
    </>
  );
};

export default Home;
