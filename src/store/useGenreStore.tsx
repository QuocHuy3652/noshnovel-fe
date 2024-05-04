import { create } from 'zustand';
import { apiGetGenre } from '~/apis';

interface GenreStore {
  genreList: any[];
  getGenreList: (server: string) => Promise<void>;
}

export const useGenreStore = create<GenreStore>((set) => ({
  genreList: [],
  getGenreList: async (server: string) => {
    const response = await apiGetGenre({ server });
    console.log(response);
    if (Array.isArray(response)) {
      set({ genreList: response });
    } else {
      console.error('apiGetListServer did not return an array');
    }
  },
}));
