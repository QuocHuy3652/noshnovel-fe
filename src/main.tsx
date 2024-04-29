import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, createHashRouter, HashRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from '~/pages';


// const router = createHashRouter([
//   {
//     path: "/noshnovel-fe",
//     element: <App />,
//     children:[
//       {
//         path: "/",
//         element: <Dashboard />
//
//       }
//     ]
//   }
// ]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);

