// The Thumbnails at the top of the page
import React, { Component } from 'react';
import movieList from '../data/movies';

class Thumbnail extends Component {
  // constructor() {
  //   super()
  // }
  updateMovieInfo = () => {
    console.log(this.props.no);
  }

  render() {
    return (
      <div onClick={this.updateMovieInfo} className="thumbnail">
        <img className="thumbnail-image" src={this.props.image} alt="thmb" />
        <div className="thumbnail-text">
          <p className="thumbnail-title">{this.props.title}</p>
          <p className="thumbnail-director">{this.props.director}</p>
        </div>
      </div>
    );
  }
}

export default Thumbnail;
