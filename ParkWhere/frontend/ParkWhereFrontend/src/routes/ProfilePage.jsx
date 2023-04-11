import { useAuth } from '../components/AuthProvider';
import { useEffect } from 'react';

function ProfilePage() {
    const {user, getCurrentUser} = useAuth();

    useEffect(() => {
        getCurrentUser();
      }, []);

    return (
        <div class="content">
            <br></br>
            <div style={{textAlign:'center'}}>
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
    )
}

export default ProfilePage;