# Reelhouse - Movie Explorer

A responsive movie discovery app built with **React, Material UI and the TMDb API**.
Search movies, browse what's trending, open detailed views with cast and trailers, filter by genre / year / rating, and save favorites.

**Live demo:** _add your Netlify link here_

## Features
- Login screen (demo auth, session kept in localStorage)
- Trending movies (weekly) with a featured hero banner
- Debounced search with **infinite scroll**; browse/filter results use a **Load more** button
- Filters: genre, release year, minimum rating
- Movie details: overview, genres, runtime, rating, cast, **YouTube trailer** dialog
- Favorites list and last search, both saved in localStorage
- Light / dark mode (remembered), mobile-first responsive layout
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

All calls go through `src/api/tmdb.js`. Errors (network, 401, 404, 429, 5xx) are converted to readable messages.

## Run locally (Windows 10 + VS Code)
1. Install Node.js LTS from https://nodejs.org and check `node -v`.
2. Get a free TMDb API key: https://www.themoviedb.org/settings/api (the "API Key (v3 auth)" value).
3. In the project folder, copy `.env.example` to `.env` and paste your key:
   `VITE_TMDB_API_KEY=your_key`
4. Open the VS Code terminal (Ctrl + `) and run:
   ```
   npm install
   npm run dev
   ```
5. Open http://localhost:5173 and sign in with any username (3+ chars) and password (6+ chars).

## Deploy to Netlify
1. Push to GitHub (and GitLab if the task requires it):
   ```
   git init
   git add .
   git commit -m "feat: movie explorer app"
   git branch -M main
   git remote add origin https://github.com/<you>/movie-explorer.git
   git push -u origin main
   ```
   `.env` is git-ignored, so your key is not committed.
2. On https://app.netlify.com choose **Add new site -> Import an existing project**, pick the repo.
3. Build command `npm run build`, publish directory `dist` (also set in `netlify.toml`).
4. Open **Site configuration -> Environment variables** and add `VITE_TMDB_API_KEY` with your key.
5. Click **Deploy**. If you added the variable after the first deploy, use **Deploys -> Trigger deploy** so it is picked up.
6. Test the live link (login, search, details, refresh on a movie page), then paste it at the top of this README.

## Notes
- Login is front-end only because the task provides no auth backend. Swap `login()` in `AuthContext` for a real API call when one exists.
- TMDb keys are visible in browser requests for any client-side app; this is normal for TMDb's public API.
