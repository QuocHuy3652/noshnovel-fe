import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useServerStore } from '~/store';
import { useDownloadStore } from '~/store/useDownloadStore';
import { HubConnectionBuilder, HubConnection, HttpTransportType } from '@microsoft/signalr';
import { SOCKET_URL } from '~/constants/socket.constant';

const useSignal = () => {
  const { serverList, getServerList } = useServerStore();
  const { fileExtensions, getFileExtensions } = useDownloadStore();
  let connection: HubConnection | null = null;

  useEffect(() => {
    connection = new HubConnectionBuilder().withUrl(`${SOCKET_URL}/service-update`).withAutomaticReconnect().build();

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
