import { useAuth } from '../components/AuthProvider';
import { useState, useEffect } from 'react';

function AccountSettings() {
    const { user, getCurrentUser } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    useEffect(() => {
        getCurrentUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        getCurrentUser();

        if (!verifyPassword) {
            alert("Please verify your old password");
            return;
        }

        let response = await fetch("http://localhost:8000/ParkApp/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user.username, password: verifyPassword })
        })
        if (response.status === 400) {
            alert("Incorrect password");
            return;
        }

        if (password) {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            response = await fetch(`http://localhost:8000/ParkApp/users/changepassword/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ password })
            })
            if (response.status === 400) {
                alert("Password change invalid");
                return;
            }
        }
        
        let jsonUser = {};
        if (username) {
            jsonUser['username'] = username;
        }

        if (email) {
            jsonUser['email'] = email;
        }

        if(!jsonUser) return;

        response = await fetch(`http://localhost:8000/ParkApp/users/${user.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(jsonUser)
        }).then((response) => {
            if (response.status === 400) {
                alert("Username already exists");
                return;
            }
            else {
                getCurrentUser();
                alert("Changes saved");
                return response.json()
            }
        })
    };

    return (
        <>
            <div className="content">
                <br></br>
                <div style={{ textAlign: 'center' }}>
                    {user ? (
                        <>
                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                        </>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
            <div className="content">
                <br></br>
                <div style={{ textAlign: 'center' }}>
                    {user ? (
                        <>
                            <form className="row g-3 needs-validation" style={{ marginTop: '0' }} onSubmit={handleSubmit}>
                                <div className="username-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                    <input type="text" className="form-control" id="validationCustom01" placeholder="Change Username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="email-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                    <input type="email" className="form-control" id="validationCustom02" placeholder="Change Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="password-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                    <input type="password" className="form-control" id="validationCustom03" placeholder="Change Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="password-confirm-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                    <input type="password" className="form-control" id="validationCustom04" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="password-verify-box" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                                    <input type="password" className="form-control" id="validationCustom05" placeholder="Verify Old Password" onChange={(e) => setVerifyPassword(e.target.value)} required />
                                </div>
                                <div className="submit-button">
                                    <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#3F72AF', borderColor: '#3F72AF' }}> Save Changes </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </>
    )
}

export default AccountSettings;