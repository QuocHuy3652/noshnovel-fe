import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import './index.css';
import { Navbar } from '~/components';
import { Dashboard } from '~/pages';
import { ReadHistory } from '~/components/ReadHistory.tsx';
import { SearchResult } from '~/components/SearchResult.tsx';
import { useServerStore } from './store/useServerStore';
import { useGenreStore } from './store/useGenreStore';
import { path } from '~/constants';

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
        {/*<Route path="/" element={''} />*/}
      </Routes>
    </>
  );
}

export default App;
