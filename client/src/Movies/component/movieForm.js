import React, { useState } from "react"

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  };

  export const movieForm = props => {
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.title === 'director') {
          value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.title]: value
          });
        };

        const handleSubmit = e => {
            e.preventDefault();
          };

          return (
            <div>
              <h2>Update Movie</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  placeholder="name"
                  value={movie.title}
                />
                </form>
            </div>
          )

  }
  





