import axios from '~/axios';

export const apiSearchNovel = (params: any) =>
  axios({
    url: '/Novels/search',
    method: 'get',
    params,
  });
