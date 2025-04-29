import { GetGenre } from "./apiHandler.js";

/**
 * Open the modal.
 */
export async function OpenModal(movie) {
    let modal = document.createElement("div");
    let genreList = await GetGenre();
    let genre = "";
    for (let i = 0; i < movie.genre_ids.length; i++) {
        genre +=
            i != movie.genre_ids.length - 1
                ? `${genreList[movie.genre_ids[i]]}, `
                : `${genreList[movie.genre_ids[i]]}`;
    }
    modal.innerHTML = `
        <div>
            <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}"
                alt="Movie Poster">
            <div class="card-body">
                <h1 class="card-title">${movie.title}</h1>
                <p class="card-text">${movie.overview}</p>
            </div>
            <div class="card-footer-vertical">
                <small class="text-body-secondary">Released: ${movie.release_date}</small>
                <small class="text-body-secondary">Rating: ${movie.vote_average}/10 (${movie.vote_count} people voted)</small>
                <small class="text-body-secondary">Genre: ${genre}</small>
                <small class="text-body-secondary">Adult: ${movie.adult}</small>
            </div>
        </div>
        <div>Click anywhere to close modal</div>
    `;
    modal.classList.add("modal");

    modal.addEventListener("click", () => {
        CloseModal();
    });

    document.body.append(modal);
}

/**
 * Closes the modal.
 */
export function CloseModal() {
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        document.body.removeChild(modals[i]);
    }
}
