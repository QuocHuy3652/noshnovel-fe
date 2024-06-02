import { useEffect } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useServerStore } from '~/store';
import { useDownloadStore } from '~/store/useDownloadStore';

const useSignal = () => {
  const { serverList, getServerList } = useServerStore();
  const { fileExtensions, getFileExtensions } = useDownloadStore();
  let connection: HubConnection | null = null;

  useEffect(() => {
    connection = new HubConnectionBuilder()
      .withUrl('http://tmplam-001-site1.ktempurl.com/service-update')
      .withAutomaticReconnect()
      .build();

    connection.start().catch(() => console.error('Error while establishing connection :('));

    connection.on('DownloadFormatUpdate', () => {
      if (!toast.isActive('downloadFormatUpdateToast')) {
        toast.info('Download format list has been updated', { toastId: 'downloadFormatUpdateToast' });
        getFileExtensions();
      }
    });

    connection.on('NovelServerUpdate', () => {
      if (!toast.isActive('novelServerUpdateToast')) {
        toast.success('Novel server list has been updated', { toastId: 'novelServerUpdateToast' });
        getServerList();
      }
    });

    return () => {
      connection?.off('DownloadFormatUpdate');
      connection?.off('NovelServerUpdate');
      connection?.stop();
    };
  }, []);

  return connection;
};

export default useSignal;
