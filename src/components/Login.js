import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import styles from './Welcome.module.css';
import { Button } from "primereact/button";
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";

function Login() {
    // const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; 
const navigate = useNavigate();
    document.title = 'Login';
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted');
        if (uname === '' || pwd === '') {
            alert('Please fill mandatory fields!');
        } else {
            console.log(pwd, uname);
        }
        const login = {
            userName: uname,
            password: pwd
        }
        const encryptedObject = CryptoJS.AES.encrypt(
            JSON.stringify(login),
            process.env.REACT_APP_SECRET_KEY
        ).toString();
        fetch('http://localhost:5000/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ encryptedObject }), // body data type must match "Content-Type" header
        }).then(res => {
            if (res.status === 200)
                // window.location.replace("/");
            navigate('/home');
        });
    }

    return (
        <div className="App">
            <div className={styles.welcomeContainer}>
                <span className={styles.welcome}>Welcome</span>
                {/* <span className={styles.letsStart}>Let's create your account!</span> */}
            </div>
            <form className={styles.signupContainer} onSubmit={onFormSubmit}>
                <div className={styles.ipRow}>
                    <span>User Name</span>
                    <input className={'signupIP'} value={uname} onChange={(e) => setUname(e.target.value)}></input>
                </div>
                <div className={styles.ipRow}>
                    <span>Password</span>
                    <input className={'signupIP signupIP-pwd'} type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}></input>
                </div>
                <Button type="submit" severity="success">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default Login;
