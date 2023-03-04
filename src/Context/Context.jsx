import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const contexto = createContext();
const { Provider } = contexto;

const Context = ({ children }) => {
  const [userLogged, setUserLogged] = useState({});
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [querySearch, setQuerySearch] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const apiKey = "3651041388931cf01228edbff2087680";

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
      const matchCookie = document.cookie.match(
        /^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/
      );
      if (matchCookie) {
        const userPersist = async () => {
          const userLog = await axios.get(
            "https://api.render.com/deploy/srv-cg0dp1t269vdqr9o5gag?key=IkLcycb7W4M/me",
            { withCredentials: true, credentials: "include" }
          );
          setUserLogged(userLog);
        };
        userPersist();
      }
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
    const dataQuery = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
    );
    setQuerySearch(dataQuery.data.results);
  };

  const addToFavorites = async (item) => {
    try {
      await axios.post(
        "https://api.render.com/deploy/srv-cg0dp1t269vdqr9o5gag?key=IkLcycb7W4M/addFavorites",
        {
          email: userLogged.data.email,
          movieId: item.id,
          title: item.title || item.name,
          vote_average: item.vote_average,
          poster_path: item.poster_path,
          adult: item.title ? true : false,
        },
        { withCredentials: true, credentials: "include" }
      );
      toast.success("Successfully added to favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    } catch {
      toast.error("You must log in to add favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  const removeFromFavorites = async (item) => {
    await axios.delete(
      `https://api.render.com/deploy/srv-cg0dp1t269vdqr9o5gag?key=IkLcycb7W4M/removeFavorites?id=${item.id}`,
      { withCredentials: true, credentials: "include" }
    );
    toast.error("Successfully deleted from favorites", {
      duration: "100",
      style: {
        background: "black",
        color: "white",
      },
    });
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
    removeFromFavorites,
  };
  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;