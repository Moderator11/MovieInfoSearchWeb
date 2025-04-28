import API_KEY_TMDB from "./keys.js";

function CheckAPIValid() {
    const url = "https://api.themoviedb.org/3/authentication";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY_TMDB}`,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}

function GetPopularKoreanMovie() {
    const url =
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=ISO%203166-2%3AKR";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY_TMDB}`,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}
