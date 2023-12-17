import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import styles from './Welcome.module.css';
import SignUp from "./SignUp";
function Welcome() {

    document.title = 'Welcome';

    return (
        <div className="App">
            <div className={styles.welcomeContainer}>
                <span className={styles.welcome}>Welcome</span>
            </div>
            <SignUp/>
        </div>
    );
}

export default Welcome;
