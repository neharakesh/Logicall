import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovies, deleteMovie } from '../api/api.js';

const MovieTable = ({ onEdit }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (loading) return; // prevent double fetch
    setLoading(true);

    try {
      const res = await getMovies(page, 10);
      console.log('API Response:', res.data);

      // Handle response data
      const fetchedMovies = res.data?.data || res.data?.movies || res.data || [];

      if (Array.isArray(fetchedMovies) && fetchedMovies.length > 0) {
        // Filter out duplicates
        const uniqueNewMovies = fetchedMovies.filter(
          (m) => !movies.some((movie) => movie._id === m._id)
        );

        // Update state using functional setState to avoid stale closure
        setMovies((prevMovies) => [...prevMovies, ...uniqueNewMovies]);

        setPage((prevPage) => prevPage + 1);
        setHasMore(uniqueNewMovies.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteMovie(id);
        setMovies((prevMovies) => prevMovies.filter((m) => m._id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMovies}
      hasMore={hasMore}
      loader={<h4 className="text-center my-4">Loading...</h4>}
      className="overflow-auto max-h-[500px]"
    >
      <table className="table-auto w-full border">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="px-2 py-1">Title</th>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Director</th>
            <th className="px-2 py-1">Budget</th>
            <th className="px-2 py-1">Location</th>
            <th className="px-2 py-1">Duration</th>
            <th className="px-2 py-1">Year</th>
            <th className="px-2 py-1">Details</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id} className="border-b hover:bg-gray-50">
              <td className="px-2 py-1">{movie.title}</td>
              <td className="px-2 py-1">{movie.type}</td>
              <td className="px-2 py-1">{movie.director}</td>
              <td className="px-2 py-1">{movie.budget}</td>
              <td className="px-2 py-1">{movie.location}</td>
              <td className="px-2 py-1">{movie.duration}</td>
              <td className="px-2 py-1">{movie.year}</td>
              <td className="px-2 py-1">{movie.details}</td>
              <td className="px-2 py-1 flex gap-2">
                <button
                  onClick={() => onEdit(movie)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default MovieTable;
