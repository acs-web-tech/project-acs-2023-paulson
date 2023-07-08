import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './public/HomePage';
import ContentPage from './public/ContentPage';
import EditingPage from './public/EditingPage';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/content',
    element: <ContentPage />
  },
  {
    path: '/edit',
    element: <EditingPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
reportWebVitals();
