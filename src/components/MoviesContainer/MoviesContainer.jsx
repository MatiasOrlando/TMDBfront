import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { contexto } from "../../Context/Context";
import CardItem from "../CardItem/CardItem";
import { apiKey } from "../../apiKey";

const MoviesContainer = ({ categoryId }) => {
  const { querySearch } = useContext(contexto);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (querySearch.length >= 1) {
        setData(querySearch);
      } else if (categoryId === "tvshows") {
        const dataTvShows = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setData(dataTvShows.data.results);
      } else {
        const dataMovies = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1`
        );
        setData(dataMovies.data.results);
      }
    };
    fetchData();
  }, [querySearch, categoryId]);

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
