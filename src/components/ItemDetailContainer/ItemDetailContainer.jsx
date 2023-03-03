import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { contexto } from "../../Context/Context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ItemDetailContainer = ({ categoryId, id }) => {
  const [dataItem, setDataItem] = useState({});
  const path = "https://image.tmdb.org/t/p/w342";
  const { addToFavorites } = useContext(contexto);
  const navigateBack = useNavigate();
  useEffect(() => {
    const fetchDataItem = async () => {
      const apiKey = "3651041388931cf01228edbff2087680";
      if (categoryId === "movies") {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`
        );
        setDataItem(data.data);
      } else {
        const data = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&page=1`
        );
        setDataItem(data.data);
      }
    };

    fetchDataItem();
  }, [id, categoryId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "50%",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div>
            <img
              style={{ borderRadius: "20px" }}
              src={dataItem.poster_path && `${path}${dataItem.poster_path}`}
              alt={categoryId === "tvshows" ? dataItem.name : dataItem.title}
            />
          </div>
          <div
            style={{
              color: "white",
              fontFamily: "Roboto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "50px",
            }}
          >
            <div>
              <h3>
                {categoryId === "tvshows" ? dataItem.name : dataItem.title}
              </h3>
            </div>
            <div>
              <h4>Overview:</h4>
            </div>
            <div>{dataItem.overview}</div>
            <div>
              <div>
                <span style={{ fontWeight: "bold" }}> Genres:</span>
                {dataItem.genres &&
                  dataItem.genres.map(({ name }) => {
                    return (
                      <span
                        style={{ padding: "0.1rem", paddingLeft: "5px" }}
                        key={name}
                      >
                        {name}
                      </span>
                    );
                  })}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}> Vote average:</span>
                <span style={{ paddingLeft: "5px" }}>
                  {isNaN(dataItem.vote_average) || dataItem.vote_average === 0.0
                    ? "NO RATE"
                    : parseFloat(dataItem.vote_average).toFixed(2)}
                </span>
              </div>
            </div>
            <div
              onClick={() => addToFavorites(dataItem)}
              style={{ fontWeight: "bold" }}
            >
              Add to Favorites
              <FavoriteIcon style={{ paddingLeft: "5px" }} />
            </div>
            <div
              style={{
                paddingTop: "40px",
                opacity: 0.7,
                fontFamily: "Roboto",
              }}
            >
              <button
                type="button"
                className="btn btn-light"
                onClick={() => navigateBack("/-1")}
                style={{ fontSize: "0.8rem" }}
              >
                Go back to search
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ItemDetailContainer;
