const MOVI_API = 'http://www.omdbapi.com/?';

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', firstLoad, false);
}

function firstLoad() {
    var searchText = document.getElementById("searchText");
    searchText.addEventListener("keydown", e => {
        if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
            renderMovies(e.target.value);
        }
    });

}

function renderMovies(searchText) {
    console.log('called');

    let moviesTemplate = '';
    fetch(`${MOVI_API}s=${searchText}`, { method: 'GET' }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        response
            .Search
            .forEach(movie => {
                let posterImage = './../assets/images/movie-poster.jpg';
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
        document
            .getElementById('movies')
            .innerHTML = moviesTemplate;
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    renderMovie(sessionStorage.getItem('movieId'));
}

function renderMovie(movieId) {
    let movieTemplate = '';
    fetch(`${MOVI_API}i=${movieId}`, { method: 'GET' }).then(response => {
        return response.json();
    }).then(movie => {
        let posterImage = './../assets/images/movie-poster.jpg';
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
                                        <img src="./../assets/images/star.png" alt="">
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
        document
            .getElementById('movie')
            .innerHTML = movieTemplate;
    });
}
