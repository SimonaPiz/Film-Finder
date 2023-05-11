let tempMovie = {};

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres')

  for (const genre of genres) {
      let option = document.createElement("option");
      option.value = genre.id;
      option.text = genre.name;
      select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  moviePosterDiv.innerHTML = '';
  movieTextDiv.innerHTML = '';
}

//create HTML li element from current movie
const createMovieLi = (movie) => {
  const movieLi = document.createElement('li');
  const movieImg = document.createElement('img');
  const movieImgUrl = `https://image.tmdb.org/t/p/original/${movie.src}`;
  movieImg.setAttribute('src', movieImgUrl);
  movieImg.setAttribute('alt', movie.title);

  movieLi.setAttribute('class', 'movieImgSmall');
  movieLi.appendChild(movieImg);

  const movieTitle = document.createElement('h3');
  movieTitle.innerHTML = movie.title;
  movieLi.appendChild(movieTitle);

  return movieLi;
}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  const moviesLikeUl = document.getElementById('likeUl');
  const movieLi = createMovieLi(tempMovie);
  moviesLikeUl.appendChild(movieLi);

  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  const moviesUnlikeUl = document.getElementById('unlikeUl');
  const movieLi = createMovieLi(tempMovie);
  moviesUnlikeUl.appendChild(movieLi);

  clearCurrentMovie();
  showRandomMovie();
  console.log(moviesDislikeList);
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie date
const createMovieDate = (date) => {
  const dateExit = document.createElement('p');
  dateExit.setAttribute('id', 'movieDate');
  dateExit.innerHTML = date;

  return dateExit;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Create HTML for movie cast list
const createMovieCast = (cast) => {
  const castList = document.createElement('ul');
  for(let actor=0; actor<cast.length; actor++){
    const actorLi = document.createElement('li');
    const actorItem = cast[actor];

    const actorImg = document.createElement('img');
    const actorImgUrl = 'https://www.themoviedb.org/t/p/w138_and_h175_face' + actorItem.profile_path;

    actorLi.setAttribute('class', 'actor');
    actorLi.appendChild(actorImg);

    const actorName = document.createElement('h3');
    actorName.innerHTML = actorItem.name;
    const actorChar = document.createElement('p');
    actorChar.innerHTML = '\"' + actorItem.character + '\"';
    const actorDiv = document.createElement('div');
    actorDiv.appendChild(actorName);
    actorDiv.appendChild(actorChar);
    actorLi.append(actorDiv);

    actorImg.setAttribute('src', actorImgUrl);
    actorImg.setAttribute('alt', actorItem.name);

    castList.appendChild(actorLi);
  }  
  
  const castHeader = document.createElement('h2');
  castHeader.setAttribute('id', 'movieCast');
  castHeader.innerHTML = 'Cast';

  const castDiv = document.createElement('div');
  castDiv.setAttribute('id', 'castContainer');
  castDiv.appendChild(castHeader);
  castDiv.appendChild(castList);

  return castDiv;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');  

  //create temp movie before add to like list or not like list
  tempMovie = {
    src: movieInfo.poster_path,
    title: movieInfo.title
  };
  //console.log(tempMovie);

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const movieDate = createMovieDate(movieInfo.release_date);
  const overviewText = createMovieOverview(movieInfo.overview);  
  const castList = createMovieCast(movieInfo.cast);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(movieDate);
  movieTextDiv.appendChild(overviewText);
  movieTextDiv.appendChild(castList);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};


