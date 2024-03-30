import React, { useRef, useState } from "react";
import 'primeicons/primeicons.css';
import styles from './Welcome.module.css';
import { Button } from "primereact/button";
import CryptoJS from 'crypto-js';

function SignUp() {
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const emailIPRef = useRef(0);

    const checkValidations = () => {
        if (fname === '' || email === '' || uname === '' || pwd === '') {
            alert('Please fill mandatory fields!');
            return false;
        }
        if (email.indexOf('@') === -1) {
            emailIPRef.current.style.border = '2px solid red';
            return false;
        } else if (email.split('@')[1].indexOf('.') === -1) {
            emailIPRef.current.style.border = '2px solid red';
            return false;
        }
        return true;
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted');
        
        if (checkValidations()) {
            const data = {
                userName: uname,
                password: pwd,
                email: email,
                firstName: fname
            }
            const encryptedObject = CryptoJS.AES.encrypt(
                JSON.stringify(data),
                process.env.REACT_APP_SECRET_KEY
            ).toString();
            const response = await fetch('http://localhost:5000/users/add', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({ encryptedObject }), // body data type must match "Content-Type" header
            });
            console.log(response.json());
        }

    }

    return (
        <>
            <span className={styles.letsStart}>Let's create your account!</span>
            <form className={styles.signupContainer} onSubmit={onFormSubmit}>
                <div className={styles.ipRow}>
                    <span>First Name <span className={styles.mandatoryFieldIcon}>*</span></span>
                    <input className={'signupIP'} value={fname} onChange={(e) => setFname(e.target.value)}></input>
                </div>
                <div className={styles.ipRow}>
                    <span>Email <span className={styles.mandatoryFieldIcon}>*</span></span>
                    <input className={'signupIP'} ref={emailIPRef} value={email} onChange={(e) => { emailIPRef.current.style.border = 'none'; setEmail(e.target.value) }}></input>
                </div>
                <div className={styles.ipRow}>
                    <span>User Name <span className={styles.mandatoryFieldIcon}>*</span></span>
                    <input className={'signupIP'} value={uname} onChange={(e) => setUname(e.target.value)}></input>
                </div>
                <div className={styles.ipRow}>
                    <span>Password <span className={styles.mandatoryFieldIcon}>*</span></span>
                    <input className={'signupIP signupIP-pwd'} type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}></input>
                </div>
                <Button type="submit" severity="success">
                    Submit
                </Button>
            </form>
        </>
    )

}
export default SignUp;