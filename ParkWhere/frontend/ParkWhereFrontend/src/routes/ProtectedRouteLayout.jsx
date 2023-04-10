import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRouteLayout() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/ParkApp/users/currentuser/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        }).then((response) => {
            if(response.status == 401) {
                navigate('/login');
            }
            return response.json()
        }).then((data) => {
            setUser(data);
        })
        .catch((error) => {
            alert("Error: ", error);
            navigate('/login');
        });
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    if(!user) {
        return null;
    }

	return (
		<>
			<MainHeader />
			<Outlet />
			<MainFooter />
		</>
	);
}

export default ProtectedRouteLayout;
