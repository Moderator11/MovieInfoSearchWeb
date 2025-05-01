import { GetPopularMovie, GetSearchResult } from "./apiHandler.js";
import {
    EnableRisky,
    ClearCard,
    FillCard,
    GetLikedMovies,
    HandleLike,
    HandleModal,
} from "./cardHandler.js";

async function Search(query) {
    if (query.length > 0) {
        let searchResult = await GetSearchResult(query);
        ClearCard();
        FillCard(searchResult);
    } else {
        ClearCard();
        let popularMovies = await GetPopularMovie();
        FillCard(popularMovies);
    }
}

const Debounce = (() => {
    let waitToSearch = null;
    return [
        (event) => {
            if (waitToSearch) clearTimeout(waitToSearch);
            waitToSearch = setTimeout(() => {
                Search(event.target.value);
            }, 500);
        },
        () => {
            if (waitToSearch) clearTimeout(waitToSearch);
            waitToSearch = null;
        },
    ];
})();

document.addEventListener("DOMContentLoaded", async () => {
    let popularMovies = await GetPopularMovie();
    ClearCard();
    FillCard(popularMovies);

    document.body.addEventListener("keydown", function (event) {
        if (event.target.id === "searchInput" && event.which === 13) {
            Debounce[1]();
            Search(event.target.value);
        }
    });

    document.body.addEventListener("input", function (event) {
        if (event.target.id === "searchInput") {
            Debounce[0](event);
        }
    });

    document.body.addEventListener("click", async function (event) {
        switch (event.target.id) {
            case "searchButton":
                Debounce[1]();
                Search(document.getElementById("searchInput").value);
                break;
            case "popularButton":
                let popularMovies = await GetPopularMovie();
                ClearCard();
                FillCard(popularMovies);
                break;
            case "myLikesButton":
                ClearCard();
                let movies = await GetLikedMovies();
                FillCard(movies);
                break;
            case "riskybutfunButton":
                EnableRisky();
                event.target.innerText = "Hover your mouse over the card";
                setTimeout(() => {
                    event.target.style.animation = "showDown 2s forwards";
                    setTimeout(() => {
                        event.target.remove();
                    }, 2000);
                }, 1000);
                break;
        }
        let card = GetCard(event.target);
        if (card) {
            if (event.target.classList[0] === "likeButton") {
                HandleLike({ currentTarget: card });
            } else {
                HandleModal({ currentTarget: card });
            }
        }
    });
});

function GetCard(element) {
    if (element == null) return null;
    if (element == document.body) return null;
    if (element.classList[0] === "card") return element;
    else return GetCard(element.parentElement);
}
