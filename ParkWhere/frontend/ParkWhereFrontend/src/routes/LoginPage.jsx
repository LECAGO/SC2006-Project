import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthProvider';
import Loading from '../components/Loading';

function LoginPage() {
    const {user, getCurrentUser} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/ParkApp/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }).then((response) => {
            if (response.status === 400) {
                setIsLoading(false);
                alert("Incorrect username or password");
                return;
            }
            return response.json()
        }).then((data) => {
            localStorage.setItem("token", data.token);
            getCurrentUser();
            setIsLoading(false);
            navigate('/');
        })
    };

    if(isLoading) return <Loading />;

    return (
        <>
            <div className="login">
                <h1 className="login-header">Login</h1>
                <br></br>
                <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                    <div className="username-box" style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="password-box" style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                        <input type="password" className="form-control" id="validationCustom02" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="submit-button">
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#3F72AF", borderColor: "#3F72AF" }}>Login</button>
                    </div>
                </form>
            </div>
            <div className="register-link">
                <p className="register-message">
                    <strong>
                        Dont have an account? Register an account right now!
                    </strong>
                </p>
                <Link to="/register">
                    <div className="submit-button register-button">
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#3F72AF", borderColor: "#3F72AF" }}>Register</button>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default LoginPage;