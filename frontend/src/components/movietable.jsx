import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovies, deleteMovie } from '../api/api.js';

const MovieTable = ({ onEdit }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getMovies(page, 10);
      const fetched = res.data?.movies || res.data?.data || [];

      if (Array.isArray(fetched)) {
        const uniqueMovies = [
          ...movies,
          ...fetched.filter((m) => !movies.some((movie) => movie._id === m._id)),
        ].filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);

        setMovies(uniqueMovies);
        setHasMore(fetched.length > 0);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteMovie(id);
        setMovies((prev) => prev.filter((m) => m._id !== id));
      } catch (err) {
        console.error('Error deleting movie:', err);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">🎬 Movie List</h2>

      <div className="border rounded-lg shadow-md overflow-hidden">
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMovies}
          hasMore={hasMore}
          loader={<p className="text-center py-3 text-gray-500">Loading more...</p>}
          className="overflow-auto max-h-[500px]"
        >
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 shadow-sm">
              <tr className="text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Type</th>
                <th className="p-2">Director</th>
                <th className="p-2">Budget</th>
                <th className="p-2">Location</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Year</th>
                <th className="p-2">Details</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No movies found 😢
                  </td>
                </tr>
              ) : (
                movies.map((movie) => (
                  <tr
                    key={movie._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 font-medium text-gray-800">{movie.title}</td>
                    <td className="p-2">{movie.type}</td>
                    <td className="p-2">{movie.director}</td>
                    <td className="p-2">{movie.budget}</td>
                    <td className="p-2">{movie.location}</td>
                    <td className="p-2">{movie.duration}</td>
                    <td className="p-2">{movie.year}</td>
                    <td className="p-2">{movie.details}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(movie)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MovieTable;

