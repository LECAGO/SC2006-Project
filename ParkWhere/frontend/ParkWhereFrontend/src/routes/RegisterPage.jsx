import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthProvider';
import Loading from '../components/Loading';

function RegisterPage() {
    const {user, getCurrentUser} = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const response = await fetch("http://localhost:8000/ParkApp/users/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password, email})
        }).then((response) => {
            if(response.status === 400) {
                alert("Username already exists");
                return;
            }
            return response.json()
        }).then((data) => {
            localStorage.setItem("token", data.token);
            getCurrentUser();
            setIsLoading(false);
            navigate('/');
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-6 reg-pitch" style={{ paddingTop: '30px', borderRight: 'solid 2px' }}>
                    <h3 style={{ textAlign: 'center' }}> Why register for ParkWhere? </h3>
                    <br></br>
                    <ul style={{ paddingLeft: '15%'}}>
                        <li>We include carparks from multiple APIs: URA, LTA and HDB</li>
                        <li>We have user personalization features such as favorite list and blacklist</li>
                        <li>We give a link to Google Maps to ease navigating to the chosen carpark</li>
                    </ul>
                </div>
                <div className="col-lg-6 reg-form" style={{ paddingTop: '30px', borderRight: 'black' }} onSubmit={handleSubmit}>
                    <div className="register" style={{ textAlign: 'center'}}>
                        <h1>Register</h1>
                        <form className="row g-3 needs-validation" style={{ marginTop: '0' }} onSubmit={handleSubmit}>
                            <div className="username-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="text" className="form-control" id="validationCustom01" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="email-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="email" className="form-control" id="validationCustom02" placeholder="example@email.com" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="password-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="password" className="form-control" id="validationCustom03" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="password-confirm-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="password" className="form-control" id="validationCustom04" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            <div className="submit-button">
                                <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#3F72AF', borderColor: '#3F72AF' }}> Register </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;