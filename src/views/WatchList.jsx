import React, { useContext } from "react";
import { contexto } from "../Context/Context";

const WatchList = () => {
  const { userWatchLater } = useContext(contexto);
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
            return (
              <CardItem key={item.id} item={item} profileUrl={profileUrl} />
            );
          })}
        </div>
        <h3
          style={{
            textAlign: "center",
            paddingTop: "100px",
            color: "white",
            fontFamily: "Roboto",
          }}
        >
          {userWatchLater.length >= 1
            ? "My Watch list"
            : "Oops no movies added yet..."}
        </h3>
      </div>
      <Toaster />
    </>
  );
};

export default WatchList;
