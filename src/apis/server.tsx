import axios from '~/axios';

export const apiGetListServer = () =>
  axios({
    url: '/Novels/servers',
    method: 'get',
  });
