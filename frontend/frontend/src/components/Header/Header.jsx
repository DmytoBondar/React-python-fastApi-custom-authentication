import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Header = () => {
    const [token, setToken] = useContext(UserContext)

    const handleLogout = () => {
        setToken(null)
        console.log("click")
    }
    return (
        <div>
            <h3>Header components 
                {token ? (
                    <Link to="/login">
                        <h1>Login</h1>
                    </Link>
                ) : (
                    <span onClick={handleLogout}> Logout</span>
                )}
            </h3>
        </div>
    );
};

export default Header;