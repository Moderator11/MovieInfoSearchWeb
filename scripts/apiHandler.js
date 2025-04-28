import API_KEY_TMDB from "../keys.js";

//https://developer.themoviedb.org/reference/movie-popular-list

const option_GET = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY_TMDB}`,
    },
};

async function Try(url, options) {
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function CheckAPIValid() {
    const url = "https://api.themoviedb.org/3/authentication";
    const options = option_GET;

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}

export async function GetPopularKoreanMovie() {
    const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=ISO%203166-2%3AKR";
    return Try(url, option_GET);
}

export async function GetSearchResult(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&region=ISO%203166-2%3AKR`;
    return Try(url, option_GET);
}

export async function GetExternalID(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/external_ids`;
    return Try(url, option_GET);
}

export async function FindByExternalID(external_id) {
    const url = `https://api.themoviedb.org/3/find/${external_id}?external_source=imdb_id&language=en-US`;
    return Try(url, option_GET);
}

let genre = null;
export async function GetGenre() {
    if (genre == null) {
        genre = await Try(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            option_GET
        );
        let newGenre = new Map();
        genre.genres.forEach((element) => {
            newGenre[element.id] = element.name;
        });
        genre = newGenre;
    }
    return genre;
}
