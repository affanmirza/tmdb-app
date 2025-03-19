import axios from 'axios';
import { MovieDetails, MoviesResponse } from '@/types/movie';
import { Category } from '@/types/category';

const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
  }
});

export const tmdbAPI = {
  getMovies: async (category: Category, page = 1): Promise<MoviesResponse> => {
    const response = await api.get(`/movie/${category.replace(/-/g, '_')}?page=${page}`);
    return response.data;
  },

  getGeneralMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get(`/discover/movie?sort_by=popularity.desc&page=${page}`);
    return response.data;
  },

  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await api.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await api.get(`/movie/${movieId}?append_to_response=credits`);
    return response.data;
  }
}; 