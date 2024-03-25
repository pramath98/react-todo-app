import './Home.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Todos from './Todos';
import AddTodo from './AddTodo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, loginFailure } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(reducer => reducer.user);
    useEffect(() => {
        fetch('http://localhost:5000/profile',
            {
                method: 'GET',
                credentials: 'include'
            }).then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then(res => {
                        console.log(res);
                        // if (res.status === 200) {
                        dispatch(login({
                            userName: res.userName,
                            id: res.id,
                            isLoggedIn: res.authenticated,
                            token: res.token
                        }));
                        // } else {

                        // }

                    });
                } else {
                    dispatch(loginFailure());
                    console.log('failed');
                    navigate('/login');
                }

            }).catch((e) => {
                console.log('login failed');
                navigate('/login');
            });
    }, []);

    return (
        userInfo.isLoggedIn &&

        <div className="App">
            <div className='app-header'>
                <div>
                    <span style={{ paddingRight: '1rem' }}>Todo</span>
                    <span style={{ color: '#ffdc90' }}>App</span>
                </div>
                {/* <div>
                    <span style={{ paddingRight: '1rem' }}>- Designed by</span>
                    <span style={{ color: '#ffdc90' }}>pramath98</span>
                </div> */}
            </div>
            <AddTodo />
            <Todos />
        </div>
    );
}

export default Home;
