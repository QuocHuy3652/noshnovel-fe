import './index.css';
import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, ReadHistory, SearchResult } from '~/components';
import { Dashboard, NovelDetails, NovelReader } from '~/pages';
import { path } from '~/constants';
import { useServerStore } from '~/store';

function App() {
  const { getServerList } = useServerStore();
  useEffect(() => {
    getServerList();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={path.HOME} element={<Dashboard />}>
          <Route path={path.HOME} element={<ReadHistory />} />
          <Route path={path.SEARCH} element={<SearchResult />} />
        </Route>
        <Route path="/novel-detail" element={<NovelDetails />} />
        <Route path="/novel-reader" element={<NovelReader />}></Route>
      </Routes>
    </>
  );
}

export default App;
