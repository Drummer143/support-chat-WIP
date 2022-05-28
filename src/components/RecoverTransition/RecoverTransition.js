import React from "react";
import { NavLink } from 'react-router-dom';

import styles from "./RecoverTransition.module.css";

function RecoverTransition() {
    return (
        <div className={styles.wrapper}>
            <p>Check your email and follow the link we sent to restore your account password</p>
            <p>It may take several minutes to deliver it. And don't forget to check the spam folders</p>
            <p>Go to <NavLink to="/" className={styles.link}>login</NavLink> page</p>
        </div>
    )
}

export default RecoverTransition;