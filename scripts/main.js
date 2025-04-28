import { GetPopularKoreanMovie, GetSearchResult } from "./apiHandler.js";
import {
    EnableRisky,
    ClearCard,
    FillCard,
    GetLikedMovies,
} from "./cardHandler.js";

async function Search() {
    let query = $("#searchInput").val();
    if (query.length > 0) {
        let searchResult = await GetSearchResult(query);
        ClearCard();
        FillCard(searchResult);
    }
}

function Debounce(func, delay) {
    let timer;
    return function () {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

$(document).on("DOMContentLoaded", async () => {
    let popularMovies = await GetPopularKoreanMovie();
    ClearCard();
    FillCard(popularMovies);

    $("#searchInput").on("keydown", function (event) {
        if (event.which === 13) Search();
    });

    $("#searchInput").on(
        "input",
        Debounce(() => {
            Search();
        }, 500)
    );

    $("#searchButton").on("click", async () => Search());

    $("#riskybutfunButton").on("click", () => {
        EnableRisky();
        $("#riskybutfunButton").empty();
        $("#riskybutfunButton").append("Hover your mouse over the card");
        $("#riskybutfunButton").fadeOut(3000);
    });

    $("#popularButton").on("click", async () => {
        let popularMovies = await GetPopularKoreanMovie();
        ClearCard();
        FillCard(popularMovies);
    });

    $("#myLikesButton").on("click", async () => {
        ClearCard();
        let movies = await GetLikedMovies();
        FillCard(movies);
    });
});
