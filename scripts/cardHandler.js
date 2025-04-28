import ResetAnimationTarget from "./script.js";
import { FindByExternalID, GetExternalID } from "./apiHandler.js";
import { OpenModal } from "./modalHandler.js";

let risky = false;

export function EnableRisky() {
    risky = true;
    ResetAnimationTarget();
}

export function ClearCard() {
    $(".cardHolder").empty();
}

export function FillCard(movies) {
    if (movies === null) {
        let card = document.createElement("div");
        card.innerHTML = "<h1>No results</h1>";
        $(".cardHolder").append(card);
        return;
    }
    movies["results"].forEach((movie) => {
        let vote = "";
        for (let i = 0; i < parseInt(movie.vote_average / 2); i++) vote += "⭐";
        vote = vote.length == 0 ? "😭" : vote;

        let overview =
            movie.overview.length > 128
                ? movie.overview.slice(0, 128) + "..."
                : movie.overview;
        overview = overview.length == 0 ? "No Description." : overview;

        let myLikes = localStorage.getItem("myLikes");
        let like = myLikes && myLikes.includes(movie.id) ? "✅" : "👍";

        let card = document.createElement("div");
        card.classList.add("card");
        card.movieID = movie.id;
        card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w${400}${
            movie.backdrop_path
        }" alt="Movie Poster">
                <div class="card-body">
                    <h3 class="card-title">${movie.title}</h3>
                    <p class="card-text">${overview}</p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">Released: ${
                        movie.release_date
                    }</small>
                    <small class="text-body-secondary">Rating: ${vote}</small>
                    <button class="likeButton">${like}</buttons>
                </div>
    `;
        $(".cardHolder").append(card);
    });

    risky && ResetAnimationTarget();

    $(".card").each((i, card) => {
        card.addEventListener("click", async (event) => {
            if (event.target.classList[0] === "likeButton") {
                HandleLike(event);
            } else {
                HandleModal(event);
            }
        });
    });
}

function HandleLike(event) {
    let myLikes = localStorage.getItem("myLikes");
    if (myLikes === null) {
        localStorage.setItem("myLikes", `${event.currentTarget.movieID},`);
        event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(
            "👍",
            "✅"
        );
    } else {
        if (myLikes.includes(event.currentTarget.movieID)) {
            myLikes = myLikes.replace(`${event.currentTarget.movieID},`, "");
            localStorage.setItem("myLikes", myLikes);
            event.currentTarget.innerHTML =
                event.currentTarget.innerHTML.replace("✅", "👍");
        } else {
            localStorage.setItem(
                "myLikes",
                myLikes + `${event.currentTarget.movieID}, `
            );
            event.currentTarget.innerHTML =
                event.currentTarget.innerHTML.replace("👍", "✅");
        }
    }
}

async function HandleModal(event) {
    let external_id = (await GetExternalID(event.currentTarget.movieID))
        .imdb_id;
    let movie = (await FindByExternalID(external_id)).movie_results[0];
    OpenModal(movie);
}

export async function GetLikedMovies() {
    let myLikes = localStorage.getItem("myLikes");
    if (myLikes === null) return null;
    myLikes = myLikes.split(",");
    if (myLikes.length === 1) {
        return null;
    }
    let movies = {
        results: [],
    };
    //forEach won't work well in this case
    for (let i = 0; i < myLikes.length - 1; i++) {
        let external_id = (await GetExternalID(myLikes[i].trim())).imdb_id;
        let movie = (await FindByExternalID(external_id)).movie_results[0];
        movies.results.push(movie);
    }
    return movies;
}
