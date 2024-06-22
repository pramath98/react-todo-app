import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const userInfo = useSelector(reducer => reducer.user);
    const logoutHandler = async () => {
        const resp = await fetch("http://localhost:5000/logout",
            {
                method: "POST", credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (resp.status === 200) navigate('/');
    }

    return (
        <div className='app-header'>
            <div className='left-container'>
                <div className='logo-container'>
                    <img onClick={() => navigate("/")} style={{ width: '1.2em', cursor:'pointer' }} src={require('../assets/Logo.png')} alt='logo' />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
                    <span style={{ paddingRight: '0.5rem' }}>Todo</span>
                    <span style={{ color: '#ffdc90' }}>App</span>
                </div>
            </div>

            {
                userInfo.isLoggedIn ?
                    <div>
                        <Button icon="pi pi-sign-out" rounded text severity="danger" aria-label="Sign out" onClick={logoutHandler} />
                    </div>
                    :
                    <div>
                        <Button rounded text raised style={{ color: 'white' }} aria-label="Sign up" label='Sign Up' onClick={() => navigate('/signup')} />
                        <Button rounded text raised aria-label="Login" label='Login' onClick={() => navigate('/login')} />
                    </div>
            }

            {/* <div>
                    <span style={{ paddingRight: '1rem' }}>- Designed by</span>
                    <span style={{ color: '#ffdc90' }}>pramath98</span>
                </div> */}
        </div>
    );
}
export default Header