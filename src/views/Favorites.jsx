import React, { useContext, useEffect } from "react";
import { contexto } from "../Context/Context";
import axios from "axios";
import CardItem from "../components/CardItem/CardItem";
import { Toaster } from "react-hot-toast";

const Favorites = () => {
  const { userFavorites, setUserFavorites, userLogged } = useContext(contexto);
  useEffect(() => {
    const fetchFavorites = async () => {
      const allFavs = await axios.get(
        `https://matiastmbdback.onrender.com/getAllFavs?id=${userLogged.data.id}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setUserFavorites(allFavs.data);
    };
    userLogged.data && fetchFavorites();
  }, [userLogged, userFavorites]);

  return (
    <>
      <div style={{ height: "100vh" }}>
        <h3
          style={{
            textAlign: "center",
            paddingTop: "50px",
            color: "white",
            fontFamily: "Roboto",
          }}
        >
          {userFavorites.length >= 1
            ? "My Favorites"
            : "Oops no favorites added yet..."}
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            paddingBottom: "50px",
          }}
        >
          {userFavorites.map((item) => {
            return <CardItem key={item.id} item={item} />;
          })}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Favorites;
