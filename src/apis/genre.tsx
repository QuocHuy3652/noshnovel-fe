import axios from '~/axios';

export const apiGetGenre = (params: any) =>
  axios({
    url: '/Novels/genres',
    method: 'get',
    params,
  });

export const apiFilterGenre = (params: any) =>
  axios({
    url: '/Novels/genre-filter',
    method: 'get',
    params,
  });
