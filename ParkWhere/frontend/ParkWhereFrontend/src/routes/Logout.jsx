import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

function Logout() {
    const { user, getCurrentUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/ParkApp/users/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        }).then((response) => {
            return response.json()
        }).then((data) => {
            localStorage.removeItem('token');
            getCurrentUser()
            navigate('/');
        })
        .catch((error) => {
            alert("Error: ", error);
        });
    }

    useEffect(() => {
        logout();
    }, []);


    return null;

}

export default Logout;