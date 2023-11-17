import React, { useState, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import styles from './Welcome.module.css';
import { Button } from "primereact/button";
function Home() {

    document.title = 'Welcome';

    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');
        if (fname === '' || email === '' || uname === '' || pwd === '') {
            alert('Please fill mandatory fields!');
        } else {
            console.log(pwd, uname, email, fname);
        }
    }

    return (
        <div className="App">
            <div className={styles.welcomeContainer}>
                <span className={styles.welcome}>Welcome</span>
                <span className={styles.letsStart}>Let's create your account!</span>
            </div>
            <form className={styles.signupContainer} onSubmit={onFormSubmit}>
                <div className={styles.ipRow}>
                    <span>First Name</span>
                    <input className={'signupIP'} value={fname} onChange={(e) => setFname(e.target.value)}></input>
                </div>
                <div className={styles.ipRow}>
                    <span>Email</span>
                    <input className={'signupIP'} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
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

export default Home;
