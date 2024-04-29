import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import './index.css'
import { Navbar } from '~/components';
import { Dashboard } from '~/pages';
import { ReadHistory } from '~/components/ReadHistory.tsx';
import { SearchResult } from '~/components/SearchResult.tsx';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/noshnovel-fe" element={<ReadHistory />} />
          <Route path="/noshnovel-fe/search-result/*" element={<SearchResult />} />
        </Route>
        {/*<Route path="/" element={''} />*/}
      </Routes>
    </>
  );
}

export default App;
