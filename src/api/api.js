import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies';

export const getMovies = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
};

export const createMovie = (data) => axios.post(API_URL, data);
export const updateMovie = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);
