import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { contexto } from "../../Context/Context";
import CardItem from "../CardItem/CardItem";

const MoviesContainer = ({ categoryId }) => {
  const { querySearch, setPagination, page } = useContext(contexto);
  const [data, setData] = useState([]);
  const apiKey = "3651041388931cf01228edbff2087680";

  useEffect(() => {
    const fetchData = async () => {
      if (querySearch.length >= 1) {
        setData(querySearch);
        setPagination(false);
      } else if (categoryId === "tvshows") {
        const dataTvShows = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`
        );
        setData(dataTvShows.data.results);
        setPagination(true);
      } else {
        const dataMovies = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}`
        );
        setData(dataMovies.data.results);
        setPagination(true);
      }
    };
    fetchData();
  }, [querySearch, categoryId, page]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginInline: "50px",
      }}
    >
      {data.map((item) => {
        return (
          <CardItem
            key={item.id}
            item={item}
            categoryId={categoryId}
            querySearch={querySearch}
          />
        );
      })}
    </div>
  );
};

export default MoviesContainer;
