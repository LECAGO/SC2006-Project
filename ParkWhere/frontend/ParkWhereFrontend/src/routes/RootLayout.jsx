import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';

function RootLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />
			<MainFooter />
		</>
	);
}

export default RootLayout;
