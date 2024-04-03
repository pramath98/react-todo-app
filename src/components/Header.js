import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";

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
            <div style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
                <span style={{ paddingRight: '0.5rem' }}>Todo</span>
                <span style={{ color: '#ffdc90' }}>App</span>
            </div>
            {
                userInfo.isLoggedIn &&
                <div>
                    <Button icon="pi pi-sign-out" rounded text severity="danger" aria-label="Sign out" onClick={logoutHandler} />
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