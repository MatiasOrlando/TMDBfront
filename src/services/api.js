import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "3651041388931cf01228edbff2087680";

export const fetchMovieTrailer = (endpoint, params) => {
  const { language, movieId, videos } = params;
  const url = `${baseUrl}/${endpoint}/${movieId}/${videos}?api_key=${apiKey}&language=${language}`;
  return axios.get(url);
};
