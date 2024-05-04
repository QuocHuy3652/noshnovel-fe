import axios from '~/axios';

export const apiGetGenre = (params: any) =>
  axios({
    url: '/Novels/genres',
    method: 'get',
    params,
  });
