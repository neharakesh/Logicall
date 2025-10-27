import React from 'react'
import MovieForm from '../components/movieform.jsx';
import MovieTable from '../components/movietable.jsx';
import { createMovie, updateMovie } from '../api/api.js';  
import { useState } from 'react';


const moviepage = () => {
        const [editingMovie, setEditingMovie] = useState(null);
          const [movies, setMovies] = useState([]);
        
          // Handle save (create or update)
          const handleSaveMovie = async (movie) => {
            try {
              if (editingMovie) {
                // Update movie
                const res = await updateMovie(editingMovie._id, movie);
                setMovies((prev) =>
                  prev.map((m) => (m._id === editingMovie._id ? res.data : m))
                );
                setEditingMovie(null);
              } else {
                // Create new movie
                const res = await createMovie(movie);
                setMovies((prev) => {
          if (prev.some((m) => m._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
        
              }
            } catch (error) {
              console.error('Error saving movie:', error);
            }
          };
        
          const handleEdit = (movie) => {
            setEditingMovie(movie);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        
          const handleCancel = () => setEditingMovie(null);
  return (
    <>
    <MovieForm
        onSubmit={handleSaveMovie}
        movieData={editingMovie}
        onCancel={editingMovie ? handleCancel : null}
      />
      <MovieTable movies={movies} setMovies={setMovies} onEdit={handleEdit} />
    
    </>
  )
}

export default moviepage
