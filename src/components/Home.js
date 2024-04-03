import './Home.css';
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
            <AddTodo />
            <Todos />
        </div>
    );
}

export default Home;
