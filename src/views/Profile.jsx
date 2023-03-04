import React, { useContext, useEffect } from "react";
import { contexto } from "../Context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CardItem from "../components/CardItem/CardItem";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const { pathname } = useLocation();
  const profileUrl = pathname.slice(1);
  const { userFavorites, setUserFavorites, userLogged } = useContext(contexto);
  useEffect(() => {
    const fetchFavorites = async () => {
      const allFavs = await axios.get(
        `https://api.render.com/deploy/srv-cg0dp1t269vdqr9o5gag?key=IkLcycb7W4M/getAllFavs?id=${userLogged.data.id}`,
        { withCredentials: true, credentials: "include" }
      );
      setUserFavorites(allFavs.data);
    };
    userLogged.data && fetchFavorites();
  }, [userLogged, userFavorites, profileUrl, setUserFavorites]);

  return (
    <>
      <div>
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
            : "Oops no favorites added yet"}
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
            return (
              <CardItem key={item.id} item={item} profileUrl={profileUrl} />
            );
          })}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Profile;