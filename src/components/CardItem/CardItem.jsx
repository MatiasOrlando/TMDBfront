import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { contexto } from "../../Context/Context";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import noimg from "../../assets/noimg.jpeg";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";

export default function CardItem({ item, querySearch, categoryId }) {
  const { pathname } = useLocation();
  const pathnameClean = pathname.slice(1);
  const path = "https://image.tmdb.org/t/p/w300";
  const { handleWatchLater, addToFavorites, userFavorites, userWatchLater } =
    useContext(contexto);
  const [isStarOn, setIsStarOn] = useState(false);
  const [isWatchOn, setIsWatchOn] = useState(false);

  useEffect(() => {
    setIsStarOn(userFavorites.some((userMovie) => userMovie.id === item.id));
  }, [item.id, userFavorites]);

  useEffect(() => {
    setIsWatchOn(userWatchLater.some((userMovie) => userMovie.id === item.id));
  }, [item.id, userWatchLater]);

  return (
    <Card
      sx={{
        width: 255,
        height: "500px",
        margin: "20px 0 20px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: "perspective(1000px) rotateY(0deg)",
        transition: "transform 0.5s",
        "&:hover": {
          transform: "scale(1.1)",
          border: "3px solid white",
        },
      }}
    >
      <Badge
        bg="dark"
        style={{ zIndex: "1", position: "absolute", fontSize: "1rem" }}
      >
        {isNaN(item.vote_average) || item.vote_average === 0.0
          ? "NO RATE"
          : parseFloat(item.vote_average).toFixed(2)}
      </Badge>
      <Link
        to={
          pathnameClean === "favorites" || pathnameClean === "watchlist"
            ? `/${item.adult ? "movies" : "tvshows"}/${
                item.movieId || item.id
              } }`
            : querySearch
            ? `/${item.title ? "movies" : "tvshows"}/${item.id}`
            : `${item.title ? "movies" : "tvshows"}/${item.id}`
        }
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="360"
          image={item.poster_path ? `${path}${item.poster_path}` : noimg}
        />
      </Link>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            fontSize: "1.1em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            width: "100%",
            boxSizing: "border-box",
            paddingRight: "20px",
            alignItems: "flex-start",
            height: "3.75em",
            lineHeight: "1.2em",
            maxHeight: "2.4em",
            minHeight: "2.4em",
          }}
          component="div"
        >
          {querySearch
            ? item.name || item.title
            : categoryId === "tvshows"
            ? item.name
            : item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {querySearch
            ? item.title
              ? item.release_date
              : item.first_air_date
            : categoryId === "tvshows"
            ? item.first_air_date
            : item.release_date}
        </Typography>
      </CardContent>
      <CardActions sx={{ pl: "12px" }}>
        <Box>
          <ToggleButtonGroup>
            <Tooltip
              title={isStarOn ? "Remove from favorites" : "Add to favorites"}
            >
              <ToggleButton
                value={isStarOn}
                onClick={() => addToFavorites(item)}
                style={{
                  border: "none",
                  padding: 0,
                  width: "auto",
                  height: "auto",
                }}
              >
                {isStarOn ? (
                  <StarIcon color="warning" sx={{ opacity: 0.5 }} />
                ) : (
                  <StarBorderIcon sx={{ opacity: 0.5 }} />
                )}
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <ToggleButtonGroup>
            <Tooltip
              title={isWatchOn ? "Remove form watch list" : "Add to watch list"}
            >
              <ToggleButton
                value={isWatchOn}
                style={{
                  border: "none",
                  padding: 0,
                  width: "auto",
                  height: "auto",
                }}
                onClick={() => {
                  handleWatchLater(item);
                }}
              >
                {isWatchOn ? (
                  <CheckCircleOutlineRoundedIcon />
                ) : (
                  <AddCircleOutlineRoundedIcon
                    fontSize="medium"
                    color="disabled"
                    sx={{ paddingTop: "0.1em" }}
                  />
                )}
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <Box style={{ maxHeight: "20%" }}>
            <Link
              to={
                pathnameClean === "favorites" || pathnameClean === "watchlist"
                  ? `/${item.adult ? "movies" : "tvshows"}/${
                      item.movieId || item.id
                    }`
                  : querySearch
                  ? `/${item.title ? "movies" : "tvshows"}/${item.id}`
                  : `${item.title ? "movies" : "tvshows"}/${item.id}`
              }
            >
              <Button size="small">Learn More</Button>
            </Link>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
