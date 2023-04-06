import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, email, password, confirmPassword);
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-6 reg-pitch" style={{ paddingTop: '30px', borderRight: 'solid 2px' }}>
                    <h3 style={{ textAlign: 'center' }}> Why register for ParkWhere? </h3>
                    <ul style={{ paddingLeft: '25%' }}>
                        <li>Reason 1</li>
                        <li>Reason 2</li>
                        <li>Reason 3</li>
                        <li>Reason 4</li>
                        <li>Reason 5</li>
                    </ul>
                </div>
                <div className="col-lg-6 reg-form" style={{ paddingTop: '30px', borderRight: 'black' }} onSubmit={handleSubmit}>
                    <div className="register" style={{ textAlign: 'center'}}>
                        <h1>Register</h1>
                        <form className="row g-3 needs-validation" style={{ marginTop: '0' }}>
                            <div className="username-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="text" className="form-control" id="validationCustom01" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="email-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="email" className="form-control" id="validationCustom02" placeholder="example@email.com" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="password-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                <input type="password" className="form-control" id="validationCustom03" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="password-comfirm-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
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