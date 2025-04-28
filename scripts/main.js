import { GetPopularKoreanMovie, GetSearchResult } from "./apiHandler.js";
import { EnableRisky, ClearCard, FillCard } from "./cardHandler.js";

async function Search() {
    let query = $("#searchInput").val();
    if (query.length > 0) {
        let searchResult = await GetSearchResult(query);
        ClearCard();
        FillCard(searchResult);
    }
}

$(document).on("DOMContentLoaded", async () => {
    let popularMovies = await GetPopularKoreanMovie();
    FillCard(popularMovies);

    $("#searchInput").on("keydown", function (event) {
        if (event.which === 13) Search();
    });

    $("#searchButton").on("click", async () => Search());

    $("#riskybutfunButton").on("click", () => {
        EnableRisky();
        $("#riskybutfunButton").empty();
        $("#riskybutfunButton").append("Hover your mouse over the card");
        $("#riskybutfunButton").fadeOut(3000);
    });
});
