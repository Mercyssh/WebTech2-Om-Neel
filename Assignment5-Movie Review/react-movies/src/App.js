import React from 'react'
import './App.css';
import Thumbnail from './components/Thumbnail.js';
import Movie from './components/Movie.js';
import movieList from './data/movies.js';

//Create thumbnails
const movieInfo = <Movie />;
console.log(movieInfo);
const thumbnails = [];
for (var i = 0; i < movieList.length; i++) {
  let push = <Thumbnail movieInfo={movieInfo} no={movieList[i].id} key={movieList[i].id} title={movieList[i].title} director={movieList[i].director} image={movieList[i].image} />
  thumbnails.push(push);
}


class App extends React.Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="maincontainer">
        <div className="maincontainer-thumbnails">
          {thumbnails}
        </div>
        <div className="maincontainer-info">
          {movieInfo}
        </div>
      </div>
    );
  }
}

export default App;
