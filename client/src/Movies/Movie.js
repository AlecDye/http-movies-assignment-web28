import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";

// Components
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setChange }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const routeToEdit = e => {
    e.preventDefault();
    history.push(`/edit-movie/${movie.id}`);
  };

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("Delete", res);
        setChange(res);
        history.push("/");
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="edit-button" onClick={routeToEdit}>
        Edit
      </div>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
