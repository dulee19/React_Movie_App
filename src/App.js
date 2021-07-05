import React, {useState,  useEffect } from 'react';
import Movie from './components/Movie';
import './App.css';

const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5c5766867e4e97455b2ced3b4f10ba60&page=1'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=5c5766867e4e97455b2ced3b4f10ba60&query='


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
      fetch(FEATURED_API)
       .then(res => res.json())
       .then(data => {
         console.log(data)
        setMovies(data.results);
       });
  }, []);
  

  const handleOnSubmit = e => {
    e.preventDefault();

    if(searchTerm) {

    fetch(SEARCH_API + searchTerm)
    .then(res => res.json())
    .then(data => {
       setMovies(data.results);
    });

      setSearchTerm('');
    }
  }

  const handleOnChange = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}>
        <input type="search" placeholder="Search..." className="search"
          value={searchTerm}
          onChange={handleOnChange}
        />
      </form>
    </header>
    <div className="movie-container">
       {movies.length > 0 && movies.map((movie) =>
        <Movie key={movie.id} {...movie} />
        )}

    </div>
    </>
  );
}

export default App;
