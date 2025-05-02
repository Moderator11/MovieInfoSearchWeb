# Kakao Tech Campus FE 1st Assignment

## How to run

You will need to prepare valid API key from [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) and replace ${YOUR_API_KEY} from following commands.

-   This command is guaranteed to work only in Windows CMD.

```
git clone git@github.com:Moderator11/MovieInfoSearchWeb.git
cd MovieInfoSearchWeb
(
echo const API_KEY_TMDB = "${YOUR_API_KEY}";
echo(
echo export default API_KEY_TMDB;
) > keys.js
```

-   If you are using other shell e.g.) Bash, PowerShell
    Create **keys.js** file **inside of MovieInfoSearchWeb folder** and fill it with following contents.
-   Replace ${YOUR_API_KEY} with your actual API key.

```
const API_KEY_TMDB = "${YOUR_API_KEY}";
export default API_KEY_TMDB;
```

Then run Live Server to open index.html  
Opening index.html in browser as a static file won't work.

## TODO

### 필수 기능 TODO

☑ Use TMDB API  
☑ Implement movie card UI  
☑ Implement movie search functionality  
☑ Implement movie detail modal functionality

### 도전 기능 TODO

☑ Lv1. Modulize, separate code  
☑ Lv1. Responsive design  
☑ Lv1. Implement movie search functionality  
☑ Lv2. Mandate event to body  
☑ Lv2. Implement bookmark functionality thorugh localStorage  
☑ Lv2. API call refactoring into async/await  
☑ Lv2. Throttling/Debouncing

### Used API & Library

-   ~~[JQuery](https://jquery.com/)~~
-   [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
