import React, { useState, useEffect } from "react"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  };

  export const MovieForm = props => {
    const {push} = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const {id} = useParams()

    useEffect(() => {
      axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
        props.setMovie(res.data)
      })
      .catch(err => {
        console.log({err})
      })
    }, [id])

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
          value = parseInt(value, 10);
          this.setState({
            value: e.target.value
          });
        }

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
          });
        };

        const handleSubmit = e => {
            e.preventDefault();
          };

          const star = (index) => (e) => {
            setMovie({
              ...movie,
              stars: movie.stars.map((star, starIndex) => {
                return starIndex === index ? e.target.value : star;
              }),
            });
          };
          const update = (e) => {
            e.preventDefault();
            axios
              .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
              .then((res) => {
                setMovie(res.data);
                setTimeout(() => {
                  push("/");
                }, 2000);
              });
          };
        

          const addStar = (e) => {
            e.preventDefault();
            setMovie({ ...movie, stars: [movie.stars, ""] });
          };

          return (
            <div>
              <h2>Update Movie</h2>
              <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={movie.title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="director"
                    placeholder="director"
                    value={movie.director}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                  />
                  {movie.stars.map((starName, index) => {
                    return (
                      <input
                        type="text"
                        name="stars"
                        placeholder="stars"
                        value={starName}
                        onChange={star(index)}
                      />
                    );
                  })}
                  <button onClick={addStar}>add star</button>
                  <button type="submit" onClick={update}>
                    submit
                  </button>
              </form>
              </div>
            
          )

  }
  





