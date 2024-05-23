import axios from '~/axios';

export const apiGetFileNameExtension = () =>
  axios({
    url: '/Novels/file-extensions',
    method: 'get'
  });

export const apiPostNovelDownload = (params: any) =>
  axios({
    url: '/Novels/download',
    method: 'post',
    data: params,
    responseType: 'blob',
  });
