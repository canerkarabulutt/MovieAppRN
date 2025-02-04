import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


//dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const movieVideosEndpoint = id => `${apiBaseUrl}/movie/${id}/videos?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}`: null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}`: null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}`: null;

export const fallbackMoviePoster = require('../assets/images/searchIcon.png');
export const fallbackPersonPoster = require('../assets/images/searchIcon.png');

const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params? params : {}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchTrendingMovies = async () => {
    return await apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = async () => {
    return await apiCall(upcomingMoviesEndpoint);
}

export const fetchPopularMovies = async () => {
    return await apiCall(popularMoviesEndpoint);
}

export const fetchTopRatedMovies = async () => {
    return await apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = async (id) => {
    return await apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = async (id) => {
    return await apiCall(movieCreditsEndpoint(id));
}

export const fetchMovieVideos = async (id) => {
    return await apiCall(movieVideosEndpoint(id));
}

export const fetchSimilarMovies = async (id) => {
    return await apiCall(similarMoviesEndpoint(id));
}

export const fetchPersonDetails = async (id) => {
    return await apiCall(personDetailsEndpoint(id));
}

export const fetchPersonMovies = async (id) => {
    return await apiCall(personMoviesEndpoint(id));
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params);
}