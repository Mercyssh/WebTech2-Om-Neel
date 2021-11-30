// Details of the movie chosen from the thumbnails
import React, { Component } from 'react';
import movieList from '../data/movies';
const defaultmovie = movieList[3];

class Movie extends Component {
  // constructor() {
  //   super()
  // }

  state = {
    title: defaultmovie.title,
    image: defaultmovie.image,
    synopsis: defaultmovie.synopsis,
    director: defaultmovie.director,
    year: defaultmovie.year,
    cast: defaultmovie.cast,
  }

  updateState = () => {
    this.setState({
      title: defaultmovie.title,
      image: defaultmovie.image,
      synopsis: defaultmovie.synopsis,
      director: defaultmovie.director,
      year: defaultmovie.year,
      cast: defaultmovie.cast,
    })
  }

  render() {
    return (
      <div className="movie">
        <img src={this.state.image} alt="Poster" className="movie-image" />
        <div className="movie-info">
          <h1>{this.state.title}</h1>
          <p className="movie-year">{this.state.year}</p>
          <p className="movie-director">Director: {this.state.director}</p>
          <p className="movie-synopsis">{this.state.synopsis}</p>
          <div className="movie-cast">
            <div>Cast</div>
            <div className="movie-cast-members">
              {this.state.cast.map(member => <div className="movie-cast-member">
                <p className="movie-cast-actor">{member.name}</p>
                <p className="movie-cast-role">{member.role}</p>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
