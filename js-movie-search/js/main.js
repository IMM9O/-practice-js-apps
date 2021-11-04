const MOVIE_API = 'http://www.omdbapi.com/?apikey=46ee5a5&';
var searchText = document.getElementById('searchText');

// if (
//   window.location.pathname === '/index.html' ||
//   window.location.pathname === '/'
// ) {
  document.addEventListener('DOMContentLoaded', firstLoad, false);
// }

function firstLoad() {
  searchText.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      //checks whether the pressed key is "Enter"
      renderMovies(e.target.value);
    }
  });
}

function renderMovies(searchText) {

  let moviesTemplate = '';
  fetch(`${MOVIE_API}s=${searchText}`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      response.Search.forEach((movie) => {
        let posterImage = './assets/images/movie-poster.jpg';
        if (movie.Poster.includes('http')) {
          posterImage = movie.Poster;
        }
        moviesTemplate += `
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">
                    <a href="#" class="thumbnail"  onclick="movieSelected('${movie.imdbID}')">
                       <img class="img-responsive" src="${posterImage}" alt="${movie.imdbID}">
                        <div class="caption">
                            <p>${movie.Title}</p>
                            <p>${movie.Year}</p>
                        </div>
                    </a>
                </div>`;
      });
      document.getElementById('movies').innerHTML = moviesTemplate;
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}
