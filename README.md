# movie-explorer-loons
Movie exploring frontend with react which is done fore assessment in loons lab

# Reelhouse - Movie Explorer

A responsive movie discovery app built with **React, Material UI and the TMDb API**.
Search movies, browse what's trending, open detailed views with cast and trailers, filter by genre / year / rating, and save favorites.

**Live demo:** _[Netlify link](https://reelhouseloon.netlify.app/)_

## Features
- Login screen (demo auth, session kept in localStorage)
- Trending movies (weekly) with a featured hero banner
- Debounced search with **infinite scroll**; browse/filter results use a **Load more** button
- Filters: genre, release year, minimum rating
- Movie details: overview, genres, runtime, rating, cast, **YouTube trailer** dialog
- Favorites list and last search, both saved in localStorage
- Light / dark mode, mobile-first responsive layout
- Friendly error messages with retry, loading skeletons, empty states

## Tech stack
React 18, Vite, Material UI v5, React Router v6, axios, Context API.
(Vite is the maintained successor to Create React App, which is deprecated.)

## Project structure
```
src/
  api/          tmdb.js              axios instance, endpoints, error messages
  components/
    common/     ErrorMessage, ProtectedRoute
    layout/     Layout, Navbar
    movie/      MovieCard, MovieGrid, SearchBar, FilterBar, Hero, TrailerDialog
  context/      AuthContext, MovieContext (favorites, last search), ThemeModeContext
  hooks/        useMovieFeed, useDebounce, useLocalStorage
  pages/        Login, Home, MovieDetails, Favorites
  theme/        theme.js (light and dark palettes)
```

## API usage (TMDb v3)
| Purpose | Endpoint |
|---|---|
| Trending | `GET /trending/movie/week` |
| Search | `GET /search/movie?query=` |
| Filters | `GET /discover/movie?with_genres=&primary_release_year=&vote_average.gte=` |
| Genres | `GET /genre/movie/list` |
| Details + cast + trailer | `GET /movie/{id}?append_to_response=credits,videos` |
