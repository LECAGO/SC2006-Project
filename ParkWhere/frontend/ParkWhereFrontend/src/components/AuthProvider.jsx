import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/ParkApp/users/currentuser/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        const data = await response.json();

        if(response.status == 200) {
            setUser(data);
        }
        else {
            setUser(null);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = { user, getCurrentUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
