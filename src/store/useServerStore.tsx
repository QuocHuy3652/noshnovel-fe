import { create } from 'zustand';
import { apiGetListServer } from '~/apis';

interface ServerStore {
  serverList: any[];
  getServerList: () => Promise<void>;
}

export const useServerStore = create<ServerStore>((set) => ({
  serverList: [],
  getServerList: async () => {
    const response = await apiGetListServer();
    if (Array.isArray(response)) {
      set({ serverList: response });
    } else {
      console.error('apiGetListServer did not return an array');
    }
  },
}));
