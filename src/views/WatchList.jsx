import React, { useContext } from "react";
import { contexto } from "../Context/Context";
import CardItem from "../components/CardItem/CardItem";
import { Toaster } from "react-hot-toast";

const WatchList = () => {
  const { userWatchLater } = useContext(contexto);
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <h3
          style={{
            textAlign: "center",
            paddingTop: "50px",
            color: "white",
            fontFamily: "Roboto",
          }}
        >
          {userWatchLater.length >= 1
            ? "My watch list"
            : "Oops no movies added yet..."}
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            paddingBottom: "50px",
          }}
        >
          {userWatchLater.map((item) => {
            return <CardItem key={item.id} item={item} />;
          })}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default WatchList;
