import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascoure: "",
  stars: []
};

const EditMovie = props => {
  console.log("EditMovie", props);
  const match = useRouteMatch();
  const history = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  const handleChanges = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    const movie = props.movies.find(item => `${item.id}` === match.params.id);
    if (movie) {
      setMovie(movie);
    }
  }, [props.movies, match]);
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(".put", res);
        // const editedMovies = res.data;

        // props.movies.map(item => {
        //   if (item.id === res.data.id) {
        //     return res.data;
        //   } else {
        //     return item;
        //   }
        // });
        props.setChange(res);
        history.push("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChanges}
      />
      <label htmlFor="director">Director:</label>
      <input
        id="director"
        type="text"
        name="director"
        value={movie.director}
        onChange={handleChanges}
      />
      <label htmlFor="metascore">Metascore:</label>
      <input
        id="metascore"
        type="tel"
        name="metascore"
        value={movie.metascore}
        onChange={handleChanges}
      />
      <label htmlFor="stars">Stars:</label>
      <textarea
        id="stars"
        type="text"
        name="stars"
        value={movie.stars}
        onChange={handleChanges}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditMovie;
