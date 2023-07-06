import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './public/HomePage';
import ContentPage from './public/ContentPage';
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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
reportWebVitals();
