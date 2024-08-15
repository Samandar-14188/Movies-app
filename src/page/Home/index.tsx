import { useEffect, useState } from "react";
import { axiosClient } from "../../utils/axiosClient";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isMovieSaved, setIsMovieSaved] = useState<boolean>(false);

  useEffect(() => {
    axiosClient.get('/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=8')
      .then((response) => {
        setMovies(response.data.results); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); 
  useEffect(() => {
    if (selectedMovie) {
      const savedMovie = localStorage.getItem('savedMovie');
      if (savedMovie) {
        setIsMovieSaved(JSON.parse(savedMovie).id === selectedMovie.id);
      }
    }
  }, [selectedMovie]);
  const handleCardClick = (movie: any) => {
    setSelectedMovie(movie);
    console.log('Selected movie:', movie);
  };
  const handleSaveClick = () => {
    if (selectedMovie) {
      if (isMovieSaved) {
        localStorage.removeItem('savedMovie');
        setIsMovieSaved(false);
      } else {
        localStorage.setItem('savedMovie', JSON.stringify(selectedMovie));
        setIsMovieSaved(true);
      }
    }
  };
  const handleBackClick = () => {
    setSelectedMovie(null); 
    setIsMovieSaved(false); 

  };

  return (
    <div className="home-container">
      {loading ? (
        <h1>Loading...</h1> 
      ) : (
        <>
          <div 
            className="movies-grid" 
            style={{ display: selectedMovie ? 'none' : 'flex' }}  
          >
            {movies.map((el, i) => (
              <div 
                key={i} 
                className="card" 
                onClick={() => handleCardClick(el)}
              >
                <img 
                  src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} 
                  alt={el.title} 
                />
                <h2>{el.title}</h2>
                <p>{el.release_date}</p>
              </div>
            ))}
          </div>

          {selectedMovie && (
            <div className="selected-movie">
              <span onClick={handleBackClick}>Back</span> 
              <div className="movie-details">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
                  alt={selectedMovie.title} 
                />
                <div className="info">
                  <h2>{selectedMovie.title}</h2>
                  <p>Release Date: {selectedMovie.release_date}</p>
                  <p>{selectedMovie.overview}</p>
                  <p>Language: {selectedMovie.original_language}</p>
                  <button 
                    onClick={handleSaveClick}
                    style={{ backgroundColor: isMovieSaved ? 'red' : 'blue', color: 'white' }}
                  >
                    {isMovieSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
