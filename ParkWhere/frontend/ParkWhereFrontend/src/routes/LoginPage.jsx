import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
      };

    return (
        <>
            <div className="login">
                <h1 className="login-header">Login</h1>
                <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
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