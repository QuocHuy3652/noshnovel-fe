import './index.css';
import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, ReadHistory, SearchResult } from '~/components';
import { Dashboard, NovelDetails, NovelReader } from '~/pages';
import { path } from '~/constants';
import { useServerStore } from '~/store';
import { useDownloadStore } from './store/useDownloadStore';
import useSignal from './hooks/useSignal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  const { getServerList } = useServerStore();
  const { getFileExtensions } = useDownloadStore();

  useEffect(() => {
    getServerList();
    getFileExtensions();
  }, []);

  useSignal();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={path.HOME} element={<Dashboard />}>
          <Route path={path.HOME} element={<ReadHistory />} />
          <Route path={path.SEARCH} element={<SearchResult />} />
        </Route>
        <Route path={path.DETAIL} element={<NovelDetails />} />
        <Route path={path.READER} element={<NovelReader />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
