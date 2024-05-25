import { create } from 'zustand';
import { apiGetNovelChapter } from '~/apis';

interface Chapter {
  label: string;
  slug: string;
  name: string;
  chapterIndex: string;
}

interface ChapterStore {
  chapterList: Chapter[];
  isChapterListUpdated: boolean;
  isLoad: boolean;
  setCurrentChapterList: (novelSlug: string, server: string | null) => Promise<void>;
}

export const useChapterStore = create<ChapterStore>((set) => ({
  chapterList: [],
  isChapterListUpdated: false,
  isLoad: false,
  setCurrentChapterList: async (novelSlug, server) => {
    set({ isLoad: true });
    let page = 1;
    let shouldContinue = true;
    let allChapters: Chapter[] = [];

    while (shouldContinue) {
      const data: any = await apiGetNovelChapter({ novelSlug, server, page, perPage: 2000 });

      if (data && Array.isArray(data.data)) {
        allChapters = [...allChapters, ...data.data];
        page += 1;

        if (page > data.totalPages) {
          shouldContinue = false;
        }
      } else {
        console.error('apiGetNovelChapter did not return an array');
        shouldContinue = false;
      }
    }

    set({ chapterList: allChapters, isChapterListUpdated: true, isLoad: false });
  },
}));
