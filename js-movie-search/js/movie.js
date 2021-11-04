const MOVIE_API = 'http://www.omdbapi.com/?apikey=46ee5a5&';

function getMovie() {
  renderMovie(sessionStorage.getItem('movieId'));
}

function renderMovie(movieId) {
  let movieTemplate = '';
  fetch(`${MOVIE_API}i=${movieId}`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((movie) => {
      let posterImage = './assets/images/movie-poster.jpg';
      if (movie.Poster.includes('http')) {
        posterImage = movie.Poster;
      }
      movieTemplate += `
               <div class="row">
                  <div class="col-md-12 well">
                      <div class="media">
                          <div class="media-left">
                              <a href="#">
                              <img src="${posterImage}" alt="${movie.Title}">
                              </a>
                          </div>
                          <div class="media-body">
  
                              <h2 class="media-heading">${movie.Title}</h2>
                              <ul class="list-group">
                                  <li class="list-group-item"><strong>Plot</strong>  ${movie.Plot}</li>
                                  <li class="list-group-item"><strong>Director</strong>  ${movie.Director}</li>
                                  <li class="list-group-item"><strong>Actors</strong>  ${movie.Actors}</li>
                                  <li class="list-group-item"><strong>Country</strong>  ${movie.Country}</li>
                                  <li class="list-group-item"><strong>Rated</strong>  ${movie.Rated}</li>
                              </ul>
  
  
                              <div class="row" >
                                   <div class="col col-md-4">
                                      <a href="http://www.imdb.com/title/${movie.imdbID}"  target="_blank" class="btn btn-info"> IMDB </a>
                                   </div>
                                   <div class="col col-md-4">
                                      <div class="rating">
                                          <img src="./assets/images/star.png" alt="">
                                          <div class="details">
                                              <span>${movie.imdbRating}</span>
                                              <span>${movie.imdbVotes}</span>
                                          </div>
                                      </div>
                                   </div>
                              </div>
  
  
                          </div>
                      </div>
  
                  </div>
              </div>
          `;
      document.getElementById('movie').innerHTML = movieTemplate;
    });
}
