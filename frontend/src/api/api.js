import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const getMovies = () => axios.get(API_URL);



const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token before every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createMovie = (movieData) => API.post("/movies", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/${id}`, movieData);

export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);


