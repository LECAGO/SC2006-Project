import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import ProtectedRouteLayout from './routes/ProtectedRouteLayout';
import SearchCarpark from './routes/SearchCarpark';
import HelpPage from './routes/HelpPage';
import ListCarpark from './routes/ListCarpark';
import FavoritesPage from './routes/FavoritesPage';
import BlacklistPage from './routes/BlacklistPage';
import LoginPage from './routes/LoginPage';
import ProfilePage from './routes/ProfilePage';
import AccountSettings from './routes/AccountSettings';
import RegisterPage from './routes/RegisterPage';
import Logout from './routes/Logout';
import './index.css'
import { AuthProvider } from './components/AuthProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ path: '/', element: <SearchCarpark />},
			{ path: '/list', element: <ListCarpark />,},
			{ path: '/login', element: <LoginPage /> },
			{ path: '/help', element: <HelpPage /> },
			{ path: '/register', element: <RegisterPage /> },
		]
	},
	{
		path: '/',
		element: <ProtectedRouteLayout />,
		children: [
			{ path: '/logout', element: <Logout />, },
			{ path: '/favorites', element: <FavoritesPage /> },
			{ path: '/blacklist', element: <BlacklistPage /> },
			{ path: '/profile', element: <ProfilePage /> },
			{ path: '/account-settings', element: <AccountSettings /> },
		],
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
)
