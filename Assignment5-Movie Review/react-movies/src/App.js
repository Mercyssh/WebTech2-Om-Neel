import React from 'react';
import './App.css';
import Thumbnail from './components/Thumbnail.js';
import Movie from './components/Movie.js';
import movieList from './data/movies.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentMovie: movieList[0]
    } //
    this.changeMovie = this.changeMovie.bind(this); //
  }

  async changeMovie(movie) {
    // console.log(movie);
    await this.setState({
      currentMovie: movie
    })
  }

  render() {
    return (
      <div className="maincontainer">
        <Thumbnail changeMovie={this.changeMovie} />
        <Movie currentMovie={this.state.currentMovie} infolist={movieList} />;
      </div>
    );
  }
}

export default App;
