// The Thumbnails at the top of the page
import React, { Component } from 'react';
import movieList from '../data/movies';

class Thumbnail extends Component {
  constructor(props) {
    super()
    // console.log(props)
  }

  updateMovieInfo = (e) => {
    let thmb = e.target.closest(".thumbnail");
  }

  render() {
    return (
      <div className="maincontainer-thumbnails">
        {
          movieList.map(movie =>
            <div key={movie.id} no={movie.id} onClick={() => this.props.changeMovie(movie)} className="thumbnail">
              <img className="thumbnail-image" src={movie.image} alt="thmb" />
              <div className="thumbnail-text">
                <p className="thumbnail-title">{movie.title}</p>
                <p className="thumbnail-director">{movie.director}</p>
              </div>
            </div>
          )
        }

        {/* <div onClick={this.updateMovieInfo} className="thumbnail">
          <img className="thumbnail-image" src={this.props.image} alt="thmb" />
          <div className="thumbnail-text">
            <p className="thumbnail-title">{this.props.title}</p>
            <p className="thumbnail-director">{this.props.director}</p>
          </div>
        </div> */}

      </div>
    );
  }
}

export default Thumbnail;
