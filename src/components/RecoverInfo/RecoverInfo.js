import React from "react";

import styles from "./RecoverInfo.module.css";

function RecoverInfo() {
    return (
        <div className={styles.wrapper}>
            <p className={styles.info}>Check your email and follow the link we sent to restore your account password</p>
            <p className={styles.info}>It may take several minutes to deliver it. And don't forget to check the spam folders</p>
            <p className={styles.info}>Go to <a href="/" className={styles.link}>login</a> page</p>
        </div>
    )
}

export default RecoverInfo;