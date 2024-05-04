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

function App() {
  const { getServerList } = useServerStore();
  const { getGenreList } = useGenreStore();
  useEffect(() => {
    getServerList();
    getGenreList();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Dashboard />}>
          <Route path="" element={<ReadHistory />} />
          <Route path="/search-result" element={<SearchResult />} />
        </Route>
        {/*<Route path="/" element={''} />*/}
      </Routes>
    </>
  );
}

export default App;
