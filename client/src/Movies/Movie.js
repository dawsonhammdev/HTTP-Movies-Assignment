import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { MovieForm } from "./component/MovieForm";


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };


  const deleteMovie = e => {
    // console.log("MOVIE", movie)
    // console.log("PARAMS.ID", params.id)
    e.preventDefault()
    axios.delete (`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log("res from Movie", res)
      const newList = movie.filter(item => `${item.id}` !== res.data)
      setMovie(newList)
      push('/movies')
    })
    .catch(err => {
      console.log("err from movie", err)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      {/* <div className="update-button" onClick={MovieForm}>
        <button onClick={() => push(`/update-movie/${movie.id}`)}>Update</button>
      </div> */}
      <Link to={`/update-movie/${movie.id}`}>
      <button>Update</button>
      </Link>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
