import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { contexto } from "../../Context/Context";
import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import noimg from "../../assets/noimg.jpeg";

export default function CardItem({
  item,
  querySearch,
  categoryId,
  profileUrl,
}) {
  const { pathname } = useLocation();
  const pathnameClean = pathname.slice(1);
  const path = "https://image.tmdb.org/t/p/w300";
  const { removeFromFavorites, addToFavorites } = useContext(contexto);

  return (
    <Card
      sx={{
        width: 255,
        height: 500,
        margin: "20px 0 20px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
      <CardMedia
        component="img"
        alt="green iguana"
        height="340"
        image={item.poster_path ? `${path}${item.poster_path}` : noimg}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontSize: "1.1em" }}
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
      <CardActions>
        {pathnameClean !== "profile" && (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              addToFavorites(item);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <div style={{ maxHeight: "20%" }}>
            <Link
              to={
                profileUrl === "profile"
                  ? `/${item.adult ? "movies" : "tvshows"}/${item.movieId}`
                  : querySearch
                  ? `/${item.title ? "movies" : "tvshows"}/${item.id}`
                  : `${item.title ? "movies" : "tvshows"}/${item.id}`
              }
            >
              <Button size="small">Learn More</Button>
            </Link>
          </div>
          <div>
            {pathnameClean === "profile" && (
              <FaTrashAlt onClick={() => removeFromFavorites(item)} />
            )}
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
