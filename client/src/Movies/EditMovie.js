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

const EditMovie = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  return (
    <form>
      <h2>Edit Movie</h2>
      <input />
      <button>Edit Movie</button>
    </form>
  );
};

export default EditMovie;
