import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const contexto = createContext();
const { Provider } = contexto;

const Context = ({ children }) => {
  //Context
  const [userLogged, setUserLogged] = useState({});
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [querySearch, setQuerySearch] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWatchLater, setUserWatchLater] = useState([]);
  const [pagination, setPagination] = useState(true);
  const [page, setPage] = useState(1);
  const apiKey = "3651041388931cf01228edbff2087680";

  useEffect(() => {
    const storedLocalFavorites = localStorage.getItem("userFavorites");
    if (storedLocalFavorites) {
      setUserFavorites(JSON.parse(storedLocalFavorites));
    }
  }, []);

  useEffect(() => {
    const storedLocalWatchLater = localStorage.getItem("userWatchLater");
    if (storedLocalWatchLater) {
      setUserWatchLater(JSON.parse(storedLocalWatchLater));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1`
      );
      setData(data.data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      // const matchCookie = document.cookie.match(
      //   /^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/
      // );
      // if (matchCookie) {
      //   const userPersist = async () => {
      //     const userLog = await axios.get(
      //       "https://matiastmbdback.onrender.com/me",
      //       { withCredentials: true, credentials: "include" }
      //     );
      //     setUserLogged(userLog);
      //   };
      //   userPersist();
      // }
      const userPersist = JSON.parse(localStorage.getItem("user")) || {};
      setUserLogged(userPersist);
    } catch (error) {
      toast.error("Token expired log in again please", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm.trim() === "") return;
    const dataQuery = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
    );

    if (!dataQuery.data.results.length) {
      toast.error("No matches found, please try again", {
        duration: 1000,
        style: {
          background: "black",
          color: "white",
        },
        className: "error-toast-test",
      });
      return;
    } else {
      setQuerySearch(dataQuery.data.results);
    }
  };

  const addToFavorites = async (item) => {
    try {
      const index = userFavorites.findIndex(
        (userMovie) =>
          userMovie.id === (item.id || item.movieId) ||
          userMovie.movieId === (item.id || item.movieId)
      );
      if (index !== -1) {
        await axios.delete(
          `https://matias-tmdb.onrender.com/removeFavorites?id=${
            item.id || item.movieId
          }`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        toast.error("Successfully deleted from favorites", {
          duration: "100",
          style: {
            background: "black",
            color: "white",
          },
        });
        const newFavorites = [...userFavorites];
        newFavorites.splice(index, 1);
        setUserFavorites(newFavorites);
        localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      } else {
        await axios.post(
          "https://matias-tmdb.onrender.com/addFavorites",
          {
            email: userLogged.data.email,
            movieId: item.id || item.movieId,
            title: item.title || item.name,
            vote_average: item.vote_average,
            poster_path: item.poster_path,
            adult: item.title ? true : false,
          },
          { withCredentials: true, credentials: "include" }
        );
        const newFavorites = [...userFavorites, item];
        setUserFavorites(newFavorites);
        localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
        toast.success("Successfully added to favorites", {
          duration: "100",
          style: {
            background: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.error("You must log in to add favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  const handleWatchLater = (movie) => {
    if (Object.keys(userLogged).length !== 0 || !userLogged) {
      const isWatchListMovie = userWatchLater.find(
        (userMovie) => userMovie.id === movie.id
      );
      if (!isWatchListMovie) {
        const newUserWatchLater = [...userWatchLater, movie];
        localStorage.setItem(
          "userWatchLater",
          JSON.stringify(newUserWatchLater)
        );
        setUserWatchLater(newUserWatchLater);
        toast.success("Successfully added to watch list", {
          duration: "100",
          style: {
            background: "black",
            color: "white",
          },
          className: "success-watch-toast-test",
        });
      } else {
        const updatedWatchList = userWatchLater.filter(
          (userMovie) => userMovie.id !== movie.id
        );
        localStorage.setItem(
          "userWatchLater",
          JSON.stringify(updatedWatchList)
        );
        setUserWatchLater(updatedWatchList);
        toast.error("Removed from watch list", {
          duration: "100",
          style: {
            background: "black",
            color: "white",
          },
        });
      }
    } else {
      return toast.error("You must log in to add to watch list", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  const valueContext = {
    userLogged,
    setUserLogged,
    data,
    setData,
    setSearchTerm,
    searchTerm,
    handleSubmit,
    querySearch,
    userFavorites,
    setUserFavorites,
    addToFavorites,
    handleWatchLater,
    userWatchLater,
    pagination,
    setPagination,
    page,
    setPage,
  };
  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
