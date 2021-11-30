// Details of the movie chosen from the thumbnails
import React, { Component } from 'react';

class Movie extends Component {

  render() {
    return (
      <div className="maincontainer-info">
        <div className="movie">
          <img src={this.props.currentMovie.image} alt="Poster" className="movie-image" />
          <div className="movie-info">
            <h1>{this.props.currentMovie.title}</h1>
            <p className="movie-year">{this.props.currentMovie.year}</p>
            <p className="movie-director">Director: {this.props.currentMovie.director}</p>
            <p className="movie-synopsis">{this.props.currentMovie.synopsis}</p>
            <div className="movie-cast">
              <div>Cast</div>
              <div className="movie-cast-members">
                {this.props.currentMovie.cast.map(member => <div key={member.name} className="movie-cast-member">
                  <p className="movie-cast-actor">{member.name}</p>
                  <p className="movie-cast-role">{member.role}</p>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Movie;
