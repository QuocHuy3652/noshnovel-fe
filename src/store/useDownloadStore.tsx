import { create } from 'zustand';
import { apiGetFileNameExtension } from '~/apis';

interface DownloadTypeStore {
  fileExtensions: any[];
  getFileExtensions: () => Promise<void>;
}

export const useDownloadStore = create<DownloadTypeStore>((set) => ({
  fileExtensions: [],
  getFileExtensions: async () => {
    const response = await apiGetFileNameExtension();
    if (Array.isArray(response)) {
      set({ fileExtensions: response });
    } else {
      console.error('apiGetFileNameExtension did not return an array');
    }
  },
}));
