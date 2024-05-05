import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '~/components';
import { Dashboard } from '~/pages';
import { ReadHistory } from '~/components/ReadHistory.tsx';
import { SearchResult } from '~/components/SearchResult.tsx';
import './index.css'
import './App.css';
import { NovelCard } from '~/components/NovelCard.tsx';
import { NovelDetails } from '~/pages/NovelDetails.tsx';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<ReadHistory />} />
            <Route path="/search-result" element={<SearchResult />} />
          </Route>
          <Route path="/novel-detail" element={<NovelDetails />} />
        </Routes>
    </>
  );
}

export default App;
