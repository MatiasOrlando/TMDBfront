import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { contexto } from "../../Context/Context";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import noImageAvailable from "../../assets/noimg.jpeg";
import ButtonMovieDetail from "../ButtonMovieDetail/ButtonMovieDetail";
import { fetchMovieTrailer } from "../../services/api";
import MovieTrailerContainer from "../MovieTrailerContainer/MovieTrailerContainer";
import {
  Box,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const ItemDetailContainer = ({ categoryId, id }) => {
  const [dataItem, setDataItem] = useState({});
  const [isInFavList, setIsInFavList] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const path = "https://image.tmdb.org/t/p/w342";
  const { addToFavorites, handleWatchLater, userFavorites, userWatchLater } =
    useContext(contexto);
  const navigateHome = useNavigate();
  const apiKey = "3651041388931cf01228edbff2087680";

  useEffect(() => {
    const fetchDataItem = async () => {
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

  useEffect(() => {
    const isFavoriteMovie = userFavorites.find(
      (movie) => movie.id === parseInt(id)
    );
    setIsInFavList(isFavoriteMovie !== undefined);

    const isWatchListMovie = userWatchLater.find(
      (movie) => movie.id === parseInt(id)
    );
    setIsInWatchList(isWatchListMovie !== undefined);
  }, [id, userFavorites, userWatchLater]);

  useEffect(() => {
    const getMovieTrailers = async () => {
      try {
        const responseTrailers = await fetchMovieTrailer("movie", {
          language: "en-US",
          movieId: id,
          videos: "videos",
        });
        const trailers = responseTrailers.data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          setTrailerUrl(`https://www.youtube.com/embed/${trailerKey}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMovieTrailers();
  }, [id]);

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Grid container spacing={4} sx={{ mt: { xs: 4, lg: 7 } }}>
            <Grid item xs={12} md={5} maxWidth="lg" sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                image={
                  dataItem.poster_path
                    ? `${path}${dataItem.poster_path}`
                    : noImageAvailable
                }
                alt={categoryId === "tvshows" ? dataItem.name : dataItem.title}
                sx={{
                  margin: "0 auto",
                  height: {
                    xs: "350px",
                    sm: "350px",
                    md: "500px",
                  },
                  width: { xs: "auto", sm: "auto", md: "100%" },
                  objectFit: "cover",
                  textAlign: "center",
                }}
              />
            </Grid>
            <Grid item xs={12} md={7} sx={{ justifyContent: "center" }}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <CardContent sx={{ height: "100%" }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.7rem",
                        md: "2rem",
                      },
                    }}
                  >
                    {categoryId === "tvshows" ? dataItem.name : dataItem.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <strong>Overview:</strong>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    {dataItem.overview
                      ? dataItem.overview
                      : "No information available"}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Box>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        <strong>Genres:</strong>
                      </Typography>
                      {dataItem.genres &&
                        dataItem.genres.map(({ name }) => (
                          <Chip
                            key={name}
                            label={name}
                            sx={{
                              backgroundColor: "white",
                              ml: 1,
                              marginTop: { xs: 1.5 },
                              color: "black",
                              opacity: 0.9,
                            }}
                          />
                        ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        mt: 0.5,
                        marginTop: { xs: 2.5 },
                      }}
                    >
                      <strong>Vote average: </strong>
                      {isNaN(dataItem.vote_average) ||
                      dataItem.vote_average === 0.0
                        ? "NO RATE"
                        : parseFloat(dataItem.vote_average).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mt: {
                        xs: 4,
                        lg: 6,
                      },
                    }}
                  >
                    <ButtonMovieDetail
                      text={
                        isInFavList
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      handleClick={() => addToFavorites(dataItem)}
                    />
                    <ButtonMovieDetail
                      text={
                        isInWatchList
                          ? "Remove from Watch list"
                          : "Add to Watch list"
                      }
                      handleClick={() => handleWatchLater(dataItem)}
                    />
                    <ButtonMovieDetail
                      text="Go back to search"
                      handleClick={() => navigateHome("/")}
                    />
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {trailerUrl && (
          <MovieTrailerContainer
            trailerUrl={trailerUrl}
            movieDetail={dataItem}
          />
        )}
      </Box>
      <Toaster />
    </>
  );
};

export default ItemDetailContainer;
