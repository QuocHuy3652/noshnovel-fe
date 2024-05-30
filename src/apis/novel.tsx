import axios from '~/axios';

export const apiSearchNovel = (params: any) =>
  axios({
    url: '/Novels/search',
    method: 'get',
    params,
  });

export const apiNovelDetail = (params: any) =>
  axios({
    url: '/Novels/detail',
    method: 'get',
    params,
  });

export const apiGetNovelChapter = (params: any) =>
  axios({
    url: '/Novels/chapters',
    method: 'get',
    params,
  });

export const apiGetNovelContent = (params: any) =>
  axios({
    url: '/Novels/content',
    method: 'get',
    params,
  });

export const apiFilterNovelByAuthor = (params: any) =>
  axios({
    url: '/Novels/author-filter',
    method: 'get',
    params,
  });
