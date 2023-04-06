import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import SearchCarpark from './routes/SearchCarpark';
import HelpPage from './routes/HelpPage';
import ListCarpark from './routes/ListCarpark';
import Favorites from './routes/Favorites';
import Blacklist from './routes/Blacklist';
import LoginPage from './routes/LoginPage';
import ProfilePage from './routes/ProfilePage';
import Contact from './routes/Contact';
import Feedback from './routes/Feedback';
import AccountSettings from './routes/AccountSettings';
import GetCarparks from "./components/GetCarparks"
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SearchCarpark />,
      },
      {
        path: '/list',
        element: <ListCarpark />,
        loader: GetCarparks
      },
      { path: '/favorites', element: <Favorites /> },
      { path: '/blacklist', element: <Blacklist /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/account-settings', element: <AccountSettings /> },
      { path: '/help', element: <HelpPage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/feedback', element: <Feedback /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
