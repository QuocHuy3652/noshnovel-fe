import { create } from 'zustand';
import { apiGetGenre } from '~/apis';

interface GenreStore {
  genreList: any[];
  currentGenre: any;
  getGenreList: (server: string) => Promise<any[]>;
  setCurrentGenre: (genre: any) => void;
}

export const useGenreStore = create<GenreStore>((set) => ({
  genreList: [],
  currentGenre: null,
  getGenreList: async (server: string) => {
    const response = await apiGetGenre({ server });
    if (Array.isArray(response)) {
      set({ genreList: response });
      return response;
    } else {
      console.error('apiGetListServer did not return an array');
      return [];
    }
  },
  setCurrentGenre: (genre: any) => {
    set({ currentGenre: genre });
  },
}));
