const tmdbKey = '296b922a2d238cbafe6098d324498b1c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try{
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      //console.log(genres);
      return genres;
    }
  }catch(error) {console.log(error)};   
};

const getMovies = async() => {
  let selectedGenre = getSelectedGenre();
  if(!selectedGenre){
    selectedGenre = '35';
  }
  //console.log(selectedGenre);
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = '?api_key=' + tmdbKey + '&include_adult=false&with_genres=' + selectedGenre;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  const pagesValidate = (pages)=> {
    if(pages>1000){
      return 100;
    }else {
      return pages;
    }
  };

  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      
      const pagesTotal = jsonResponse.total_pages;   
      //console.log(pagesTotal);   
      const pages = pagesValidate(pagesTotal);      
      const randomIndex = Math.floor(Math.random() * pages);

      const urlPage = urlToFetch + '&page=' + randomIndex;

      const responseRandomPage = await fetch(urlPage);
      if (responseRandomPage.ok){
        const jsonResponseRandomPage = await responseRandomPage.json();
        //console.log(jsonResponseRandomPage);
        const movies = jsonResponseRandomPage.results;
        
        return movies;
      }
    }
  }catch(error){
    console.log(error);
  }
};

const getMovieInfo = async(movie) => {
  const movieId = movie.id;
  //console.log(movieId);
  const movieEndpoint = '/movie/' + movieId;
  //console.log(movieEndpoint);
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  //console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  }catch(error){
    console.log(error);
  }
};

//Get movie cast from credits
const getMovieCast = async(movie) => {
  const movieId = movie.id;
  const creditsEndpoint = '/movie/' + movieId + '/credits';
  const queryParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + creditsEndpoint + queryParams;

  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const cast = jsonResponse.cast;
      //console.log(cast);
      return cast;
    }
  }catch(error){console.log(error)}
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  //console.log(randomMovie);
  const info = await getMovieInfo(randomMovie);
  
  const movieCast = await getMovieCast(randomMovie);
  info.cast = movieCast;
  //console.log(info);

  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
showRandomMovie();