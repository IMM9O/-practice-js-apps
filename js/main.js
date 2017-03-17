const MOVI_API = 'http://www.omdbapi.com/?';

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', firstLoad, false);
}


function firstLoad() {
    var searchText = document.getElementById("searchText");
    searchText.addEventListener("keydown", e => {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            renderMovies(e.target.value);
        }
    });


}

function renderMovies(searchText) {
    console.log('called');

    let moviesTemplate = '';
    fetch(`${MOVI_API}s=${searchText}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(response => {

        response.Search.forEach(movie => {
            moviesTemplate += `
            <div class="card" onclick="movieSelected('${movie.imdbID}')">
              <img src="${movie.Poster}" alt=""> 
              <div class="title" > ${movie.Title} </div>
            </div>
            
            `;
        });
        document.getElementById('movies').innerHTML = moviesTemplate;
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
    fetch(`${MOVI_API}i=${movieId}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(movie => {
        movieTemplate += `
             <div class="row">
                <div class="col-md-12 well">
                    <div class="media">
                    <div class="media-left">
                        <a href="#">
                        <img src="${movie.Poster}" alt="${movie.Title}">
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
                    </div>
                    </div>

                </div>
            </div>
        `;
        document.getElementById('movie').innerHTML = movieTemplate;
    });
}
